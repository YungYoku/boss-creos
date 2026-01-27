/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_1302879749')

	// update field
	collection.fields.addAt(4, new Field({
		'hidden': false,
		'id': 'number1887309346',
		'max': null,
		'min': null,
		'name': 'resizePrice',
		'onlyInt': false,
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'number'
	}))

	// update field
	collection.fields.addAt(5, new Field({
		'hidden': false,
		'id': 'number2244428374',
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
	const collection = app.findCollectionByNameOrId('pbc_1302879749')

	// update field
	collection.fields.addAt(4, new Field({
		'hidden': false,
		'id': 'number1887309346',
		'max': null,
		'min': null,
		'name': 'resize',
		'onlyInt': false,
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'number'
	}))

	// update field
	collection.fields.addAt(5, new Field({
		'hidden': false,
		'id': 'number2244428374',
		'max': null,
		'min': null,
		'name': 'reskin',
		'onlyInt': false,
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'number'
	}))

	return app.save(collection)
})
