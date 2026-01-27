/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('_pb_users_auth_')

	// remove field
	collection.fields.removeById('ycdlapbz')

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('_pb_users_auth_')

	// add field
	collection.fields.addAt(13, new Field({
		'cascadeDelete': false,
		'collectionId': 'cekci3zm5xb3o3v',
		'hidden': false,
		'id': 'ycdlapbz',
		'maxSelect': 2147483647,
		'minSelect': 0,
		'name': 'disciplines',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	return app.save(collection)
})
