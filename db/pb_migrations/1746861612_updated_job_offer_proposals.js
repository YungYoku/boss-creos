/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('x80v3s00m0by1j3')

	// update collection data
	unmarshal({
		'name': 'project_proposals'
	}, collection)

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('x80v3s00m0by1j3')

	// update collection data
	unmarshal({
		'name': 'job_offer_proposals'
	}, collection)

	return app.save(collection)
})
