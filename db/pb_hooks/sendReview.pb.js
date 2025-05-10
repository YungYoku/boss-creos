routerAdd('POST', '/api/send-review/:offerId', (c) => {
	const offerId = c.pathParam('offerId')
	const offer = $app.dao().findRecordById('job_offers', offerId)


	const token = c.request().header.get('Authorization')
	const user = $app.dao().findAuthRecordByToken(token, $app.settings().recordAuthToken.secret)
	const userId = user.get('id')
	const role = user.get('role')


	const data = $apis.requestInfo(c).data
	const stars = data.stars
	const review = data.review

	const addReview = () => {
		const collection = $app.dao().findCollectionByNameOrId('ratings')

		const record = new Record(collection)

		const form = new RecordUpsertForm($app, record)

		form.loadData({
			'stars': stars,
			'review': review,
			'by': userId,
		})

		form.submit()

		return record
	}


	if (role === 'customer') {
		const currentRatingExecutor = offer.get('ratingExecutor')
		if (currentRatingExecutor.length > 0) {
			const currentRating = $app.dao().findRecordById('ratings', currentRatingExecutor)
			currentRating.set('stars', stars)
			currentRating.set('review', review)
			$app.dao().saveRecord(currentRating)

			return c.json(200, currentRating)
		} else {
			const executorId = offer.get('executor')
			const executor = $app.dao().findRecordById('users', executorId)
			const currentUserRating = executor.get('rating')

			const record = addReview()
			const ratingId = record.get('id')

			offer.set('ratingExecutor', ratingId)
			$app.dao().saveRecord(offer)

			executor.set('rating', [...currentUserRating, ratingId])
			$app.dao().saveRecord(executor)

			const currentRating = $app.dao().findRecordById('ratings', ratingId)
			return c.json(200, currentRating)
		}
	}
	if (role === 'executor') {
		const currentRatingCreator = offer.get('ratingCreator')
		if (currentRatingCreator.length > 0) {
			const currentRating = $app.dao().findRecordById('ratings', currentRatingCreator)
			currentRating.set('stars', stars)
			currentRating.set('review', review)
			$app.dao().saveRecord(currentRating)

			return c.json(200, currentRating)
		} else {
			const creatorId = offer.get('creator')
			const creator = $app.dao().findRecordById('users', creatorId)
			const currentUserRating = creator.get('rating')

			const record = addReview()
			const ratingId = record.get('id')

			offer.set('ratingCreator', ratingId)
			$app.dao().saveRecord(offer)

			creator.set('rating', [...currentUserRating, ratingId])
			$app.dao().saveRecord(creator)

			const currentRating = $app.dao().findRecordById('ratings', ratingId)
			return c.json(200, currentRating)
		}
	}
	return c.json(400, { message: 'Could not find user' })
})
