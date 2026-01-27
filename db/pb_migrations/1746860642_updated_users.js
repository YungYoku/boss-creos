/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('_pb_users_auth_')

	// remove field
	collection.fields.removeById('tyaz8ihf')

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('_pb_users_auth_')

	// add field
	collection.fields.addAt(11, new Field({
		'cascadeDelete': false,
		'collectionId': 'kcdc834cfn6sjv3',
		'hidden': false,
		'id': 'tyaz8ihf',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'university',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	return app.save(collection)
})
