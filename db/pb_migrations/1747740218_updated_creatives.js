/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// add field
	collection.fields.addAt(14, new Field({
		'hidden': false,
		'id': 'bool2244428374',
		'name': 'reskin',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'bool'
	}))

	// add field
	collection.fields.addAt(15, new Field({
		'hidden': false,
		'id': 'number1599294411',
		'max': null,
		'min': null,
		'name': 'reskinPrice',
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
	collection.fields.removeById('bool2244428374')

	// remove field
	collection.fields.removeById('number1599294411')

	return app.save(collection)
})
