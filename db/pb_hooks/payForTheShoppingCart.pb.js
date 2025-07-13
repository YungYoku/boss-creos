routerAdd('POST', '/api/baskets/pay', (c) => {
	const token = c.request.header.get('Authorization')
	const user = $app.findAuthRecordByToken(token, 'auth')
	const baskets = user.get('baskets')

	const updateShoppingCarts = () => {
		for (const cart of baskets) {
			const fullCart = $app.findRecordById('baskets', cart)

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

	updateShoppingCarts()

	$app.expandRecord(user, ['baskets', 'baskets.creative', 'baskets.creative.preview', 'baskets.creative.slot', 'baskets.geo'], null)

	return c.json(200, user)
})
