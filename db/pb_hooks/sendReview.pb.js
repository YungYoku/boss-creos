routerAdd('POST', '/api/send-review/{offerId}', (c) => {
	const offerId = c.request.pathValue('offerId')
	const offer = $app.findRecordById('job_offers', offerId)


	const token = c.request.header.get('Authorization')
	const user = $app.findAuthRecordByToken(token, 'auth')
	const userId = user.get('id')
	const role = user.get('role')


	const data = c.requestInfo().body
	const stars = data.stars
	const review = data.review

	const addReview = () => {
		const collection = $app.findCollectionByNameOrId('ratings')

		const record = new Record(collection)

		record.set('stars', stars)
		record.set('review', review)
		record.set('by', userId)

		$app.save(record)

		return record
	}


	if (role === 'customer') {
		const currentRatingExecutor = offer.get('ratingExecutor')
		if (currentRatingExecutor.length > 0) {
			const currentRating = $app.findRecordById('ratings', currentRatingExecutor)
			currentRating.set('stars', stars)
			currentRating.set('review', review)

			$app.save(currentRating)

			return c.json(200, currentRating)
		} else {
			const executorId = offer.get('executor')
			const executor = $app.findRecordById('users', executorId)
			const currentUserRating = executor.get('rating')

			const record = addReview()
			const ratingId = record.get('id')

			offer.set('ratingExecutor', ratingId)
			$app.save(offer)

			executor.set('rating', [...currentUserRating, ratingId])
			$app.save(executor)

			const currentRating = $app.findRecordById('ratings', ratingId)
			return c.json(200, currentRating)
		}
	}
	if (role === 'executor') {
		const currentRatingCreator = offer.get('ratingCreator')
		if (currentRatingCreator.length > 0) {
			const currentRating = $app.findRecordById('ratings', currentRatingCreator)
			currentRating.set('stars', stars)
			currentRating.set('review', review)

			$app.save(currentRating)

			return c.json(200, currentRating)
		} else {
			const creatorId = offer.get('creator')
			const creator = $app.findRecordById('users', creatorId)
			const currentUserRating = creator.get('rating')

			const record = addReview()
			const ratingId = record.get('id')

			offer.set('ratingCreator', ratingId)
			$app.save(offer)

			creator.set('rating', [...currentUserRating, ratingId])
			$app.save(creator)

			const currentRating = $app.findRecordById('ratings', ratingId)
			return c.json(200, currentRating)
		}
	}
	return c.json(400, { message: 'Could not find user' })
})
