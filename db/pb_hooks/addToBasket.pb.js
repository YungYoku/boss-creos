routerAdd('POST', '/api/baskets/add', (c) => {
	const token = c.request.header.get('Authorization')
	const user = $app.findAuthRecordByToken(token, 'auth')

	const data = c.requestInfo().body
	const creative = data.creative
	const geo = data.geo

	const createShoppingCard = () => {
		const collection = $app.findCollectionByNameOrId('baskets')

		const record = new Record(collection)

		record.set('creative', creative)
		record.set('geo', geo)

		$app.save(record)

		return record.get('id')
	}

	const updateUserInfo = (shoppingCardId) => {
		user.set('baskets', [...user.get('baskets'), shoppingCardId])
		$app.save(user)
	}

	const shoppingCardId = createShoppingCard()
	updateUserInfo(shoppingCardId)

	return c.json(200, user)
})
