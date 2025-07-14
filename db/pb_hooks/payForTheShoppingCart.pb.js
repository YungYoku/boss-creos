routerAdd('POST', '/api/baskets/pay', (c) => {
	const token = c.request.header.get('Authorization')
	const user = $app.findAuthRecordByToken(token, 'auth')
	const baskets = user.get('baskets')

	const calculateTotalPrice = () => {
		let result = 0
		for (const cart of baskets) {
			const fullCart = $app.findRecordById('baskets', cart)

			if (fullCart.get('status') !== 'created') continue

			const creativeId = fullCart.get('creative')
			const creative = $app.findRecordById('creatives', creativeId)

			result += creative.get('price') * fullCart.get('geo').length
		}
		return result
	}

	const updateShoppingCarts = () => {
		for (const cart of baskets) {
			const fullCart = $app.findRecordById('baskets', cart)

			if (fullCart.get('status') !== 'created') continue

			fullCart.set('status', 'pending')
			const cartGeo = fullCart.get('geo')

			$app.save(fullCart)


			const creativeId = fullCart.get('creative')
			const creative = $app.findRecordById('creatives', creativeId)
			const unavailableGeo = creative.get('unavailableGeo')
			creative.set('unavailableGeo', [...unavailableGeo, ...cartGeo])

			$app.save(creative)
		}
	}

	const totalPrice = calculateTotalPrice()

	const updateUserBalance = () => {
		user.set('balance', user.get('balance') - totalPrice)
		$app.save(user)
	}

	if (user.get('balance') > totalPrice) {
		updateShoppingCarts()
		updateUserBalance()
	}

	$app.expandRecord(user, ['baskets', 'baskets.creative', 'baskets.creative.preview', 'baskets.creative.slot', 'baskets.geo'], null)
	return c.json(200, user)
})
