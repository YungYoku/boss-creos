routerAdd('POST', '/api/check-notifications', (c) => {
	const token = c.request.header.get('Authorization')
	const user = $app.findAuthRecordByToken(token, 'auth')
	const notificationsIds = user.get('notifications')

	const notifications = $app.findRecordsByIds('notifications', notificationsIds)
	if (notifications.length > 0) {
		const uncheckedNotifications = notifications.filter((notification) => !notification.checked)
		uncheckedNotifications.forEach(notification => {
			const record = $app.findRecordById('notifications', notification.id)

			record.set('checked', true)

			$app.save(record)
		})

		return c.json(200, uncheckedNotifications)
	}

	return c.json(200, [])
})
