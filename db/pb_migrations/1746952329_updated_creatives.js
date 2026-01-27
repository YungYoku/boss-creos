/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// add field
	collection.fields.addAt(3, new Field({
		'cascadeDelete': false,
		'collectionId': 'pbc_2021195245',
		'hidden': false,
		'id': 'relation2002708380',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'geo',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// remove field
	collection.fields.removeById('relation2002708380')

	return app.save(collection)
})
