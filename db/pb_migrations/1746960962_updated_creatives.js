/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// add field
	collection.fields.addAt(6, new Field({
		'hidden': false,
		'id': 'bool3937857156',
		'name': 'watermark',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'bool'
	}))

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// remove field
	collection.fields.removeById('bool3937857156')

	return app.save(collection)
})
