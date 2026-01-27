/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// add field
	collection.fields.addAt(12, new Field({
		'hidden': false,
		'id': 'bool1887309346',
		'name': 'resize',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'bool'
	}))

	// add field
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
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// remove field
	collection.fields.removeById('bool1887309346')

	// remove field
	collection.fields.removeById('number1790274534')

	return app.save(collection)
})
