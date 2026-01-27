/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('_pb_users_auth_')

	// add field
	collection.fields.addAt(16, new Field({
		'cascadeDelete': false,
		'collectionId': 'pbc_1302879749',
		'hidden': false,
		'id': 'relation3707445743',
		'maxSelect': 999,
		'minSelect': 0,
		'name': 'baskets',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('_pb_users_auth_')

	// remove field
	collection.fields.removeById('relation3707445743')

	return app.save(collection)
})
