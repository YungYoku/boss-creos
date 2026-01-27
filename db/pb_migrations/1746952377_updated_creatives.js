/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// add field
	collection.fields.addAt(4, new Field({
		'cascadeDelete': false,
		'collectionId': 'pbc_53644091',
		'hidden': false,
		'id': 'relation2886606951',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'slot',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// remove field
	collection.fields.removeById('relation2886606951')

	return app.save(collection)
})
