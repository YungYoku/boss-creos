/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// add field
	collection.fields.addAt(24, new Field({
		'hidden': false,
		'id': 'json539015229',
		'maxSize': 0,
		'name': 'changes',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'json'
	}))

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// remove field
	collection.fields.removeById('json539015229')

	return app.save(collection)
})
