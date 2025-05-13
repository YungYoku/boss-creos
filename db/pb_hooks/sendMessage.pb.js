routerAdd('POST', '/api/send-message/{chatId}', (c) => {
	const chatId = c.request.pathValue('chatId')
	const chat = $app.findRecordById('chats', chatId)
	const messages = chat.get('messages')


	const token = c.request.header.get('Authorization')
	const user = $app.findAuthRecordByToken(token, 'auth')
	const userId = user.get('id')


	const data = c.requestInfo().body
	const text = data.text
	const file = data.file

	const createMessage = () => {
		const collection = $app.findCollectionByNameOrId('messages')

		const record = new Record(collection)

		record.set('text', text)
		record.set('file', file)
		record.set('user', userId)

		$app.save(record)

		return record.get('id')
	}

	const updateChat = (messageId) => {
		chat.set('messages', [...messages, messageId])
		$app.save(chat)
	}

	const messageId = createMessage()
	updateChat(messageId)

	return c.json(200, {})
})
