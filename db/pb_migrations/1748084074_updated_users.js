/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('_pb_users_auth_')

	// remove field
	collection.fields.removeById('users_name')

	// remove field
	collection.fields.removeById('bd5dxxd2')

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('_pb_users_auth_')

	// add field
	collection.fields.addAt(7, new Field({
		'autogeneratePattern': '',
		'hidden': false,
		'id': 'users_name',
		'max': 0,
		'min': 0,
		'name': 'name',
		'pattern': '',
		'presentable': false,
		'primaryKey': false,
		'required': false,
		'system': false,
		'type': 'text'
	}))

	// add field
	collection.fields.addAt(9, new Field({
		'autogeneratePattern': '',
		'hidden': false,
		'id': 'bd5dxxd2',
		'max': 0,
		'min': 0,
		'name': 'surname',
		'pattern': '',
		'presentable': false,
		'primaryKey': false,
		'required': false,
		'system': false,
		'type': 'text'
	}))

	return app.save(collection)
})
