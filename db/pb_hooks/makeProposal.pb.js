routerAdd('POST', '/api/make-proposal/{offerId}', (c) => {
	const offerId = c.request.pathValue('offerId')
	const offer = $app.findRecordById('job_offers', offerId)
	const offerProposals = offer.get('proposals')


	const token = c.request.header.get('Authorization')
	const user = $app.findAuthRecordByToken(token, 'auth')
	const userId = user.get('id')

	const reduceEnergy = () => {
		const energy = user.get('energy')
		user.set('energy', energy - 1)
		$app.save(user)
	}

	const createChat = () => {
		const collection = $app.findCollectionByNameOrId('chats')

		const record = new Record(collection)

		$app.save(record)

		return record.get('id')
	}


	const data = c.requestInfo().body
	const price = data?.price ?? 0
	const text = data?.text ?? ''

	const createProposal = (chat) => {
		const collection = $app.findCollectionByNameOrId('job_offer_proposals')

		const record = new Record(collection)

		record.set('chat', chat)
		record.set('user', userId)
		record.set('price', price)
		record.set('text', text)

		$app.save(record)

		return record.get('id')
	}

	// Вынести в общий код для других роутов
	const sendNotification = (link = '') => {
		const createNotification = () => {
			const collection = $app.findCollectionByNameOrId('notifications')

			const record = new Record(collection)

			record.set('text', 'На ваше объявление откликнулись.')
			record.set('link', link)

			$app.save(record)

			return record.get('id')
		}

		const offerCreatorId = offer.get('creator')
		const offerCreator = $app.findRecordById('users', offerCreatorId)

		const offerCreatorNotifications = offerCreator.get('notifications')
		const notificationId = createNotification()
		offerCreator.set('notifications', [...offerCreatorNotifications, notificationId])

		$app.save(offerCreator)
	}

	reduceEnergy()
	const chatId = createChat()
	const proposalId = createProposal(chatId)

	offer.set('proposals', [...offerProposals, proposalId])
	$app.save(offer)
	$app.expandRecord(offer, ['creator', 'proposals', 'discipline'], null)
	sendNotification('/made-offers')

	return c.json(200, offer)
})
