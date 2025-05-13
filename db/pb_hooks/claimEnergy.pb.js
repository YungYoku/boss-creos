routerAdd('POST', '/api/claim-energy', (c) => {
	const token = c.request.header.get('Authorization')
	const user = $app.findAuthRecordByToken(token, 'auth')
	const checked_at = new Date(user.getString('checked_at').replace(' ', 'T'))
	const current_date = new Date()

	const isYearPassed = current_date.getFullYear() > checked_at.getFullYear()
	const isMonthPassed = current_date.getMonth() > checked_at.getMonth()
	const isDayPassed = current_date.getDate() > checked_at.getDate()

	if (isYearPassed || isMonthPassed || isDayPassed) {
		const addEnergy = () => {
			const energy = user.get('energy')
			user.set('energy', energy + 5)
			user.set('checked_at', new Date())

			$app.save(user)
		}

		addEnergy()
		return c.json(200, user)
	}

	return c.json(400, user)
})
