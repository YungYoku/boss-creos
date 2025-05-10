routerAdd('POST', '/api/make-proposal/:offerId', (c) => {
	const offerId = c.pathParam('offerId')
	const offer = $app.dao().findRecordById('job_offers', offerId)
	const offerProposals = offer.get('proposals')


	const token = c.request().header.get('Authorization')
	const user = $app.dao().findAuthRecordByToken(token, $app.settings().recordAuthToken.secret)
	const userId = user.get('id')

	const reduceEnergy = () => {
		const energy = user.get('energy')
		user.set('energy', energy - 1)
		$app.dao().saveRecord(user)
	}

	const createChat = () => {
		const collection = $app.dao().findCollectionByNameOrId('chats')

		const record = new Record(collection)

		const form = new RecordUpsertForm($app, record)

		form.submit()

		return record.get('id')
	}

	const createProposal = (chatId) => {
		const collection = $app.dao().findCollectionByNameOrId('job_offer_proposals')

		const record = new Record(collection)

		const form = new RecordUpsertForm($app, record)

		form.loadData({
			'chat': chatId,
			'user': userId
		})

		form.submit()

		return record.get('id')
	}

	// Вынести в общий код для других роутов
	const sendNotification = () => {
		const createNotification = () => {
			const collection = $app.dao().findCollectionByNameOrId('notifications')

			const record = new Record(collection)

			const form = new RecordUpsertForm($app, record)

			form.loadData({
				'text': 'На ваше объявление откликнулись.'
			})

			form.submit()

			return record.get('id')
		}

		const offerCreatorId = offer.get('creator')
		const offerCreator = $app.dao().findRecordById('users', offerCreatorId)

		const offerCreatorNotifications = offerCreator.get('notifications')
		const notificationId = createNotification()
		offerCreator.set('notifications', [...offerCreatorNotifications, notificationId])

		$app.dao().saveRecord(offerCreator)
	}

	reduceEnergy()
	const chatId = createChat()
	const proposalId = createProposal(chatId)

	offer.set('proposals', [...offerProposals, proposalId])
	$app.dao().saveRecord(offer)
	$app.dao().expandRecord(offer, ['creator', 'proposals', 'discipline'], null)
	sendNotification()

	return c.json(200, offer)
})
