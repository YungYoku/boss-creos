routerAdd('POST', '/api/send-message/:chatId', (c) => {
	const chatId = c.pathParam('chatId')
	const chat = $app.dao().findRecordById('chats', chatId)
	const messages = chat.get('messages')


	const token = c.request().header.get('Authorization')
	const user = $app.dao().findAuthRecordByToken(token, $app.settings().recordAuthToken.secret)
	const userId = user.get('id')


	const data = $apis.requestInfo(c).data
	const text = data.text
	const file = data.file

	const createMessage = () => {
		const collection = $app.dao().findCollectionByNameOrId('messages')

		const record = new Record(collection)

		const form = new RecordUpsertForm($app, record)

		form.loadData({
			'text': text,
			'file': file,
			'user': userId,
		})

		form.submit()

		return record.get('id')
	}

	const updateChat = (messageId) => {
		chat.set('messages', [...messages, messageId])
		$app.dao().saveRecord(chat)
	}

	const messageId = createMessage()
	updateChat(messageId)

	return c.json(200, {})
})
