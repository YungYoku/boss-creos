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


	if (role === 'buyer') {
		const currentRatingBuyer = offer.get('ratingBuyer')
		if (currentRatingBuyer.length > 0) {
			const currentRating = $app.findRecordById('ratings', currentRatingBuyer)
			currentRating.set('stars', stars)
			currentRating.set('review', review)

			$app.save(currentRating)

			return c.json(200, currentRating)
		} else {
			const designerId = offer.get('designer')
			const designer = $app.findRecordById('users', designerId)
			const currentUserRating = designer.get('rating')

			const record = addReview()
			const ratingId = record.get('id')

			offer.set('ratingDesigner', ratingId)
			$app.save(offer)

			designer.set('rating', [...currentUserRating, ratingId])
			$app.save(designer)

			const currentRating = $app.findRecordById('ratings', ratingId)
			return c.json(200, currentRating)
		}
	}
	if (role === 'designer') {
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
