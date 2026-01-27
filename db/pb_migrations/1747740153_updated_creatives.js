/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// update field
	collection.fields.addAt(13, new Field({
		'hidden': false,
		'id': 'number1790274534',
		'max': null,
		'min': null,
		'name': 'resizePrice',
		'onlyInt': false,
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'number'
	}))

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// update field
	collection.fields.addAt(13, new Field({
		'hidden': false,
		'id': 'number1790274534',
		'max': null,
		'min': null,
		'name': 'resize_price',
		'onlyInt': false,
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'number'
	}))

	return app.save(collection)
})
