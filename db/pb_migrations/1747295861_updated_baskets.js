/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_1302879749')

	// update field
	collection.fields.addAt(1, new Field({
		'cascadeDelete': false,
		'collectionId': 'pbc_3625530119',
		'hidden': false,
		'id': 'relation1530721764',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'creative',
		'presentable': false,
		'required': true,
		'system': false,
		'type': 'relation'
	}))

	// update field
	collection.fields.addAt(2, new Field({
		'cascadeDelete': false,
		'collectionId': 'pbc_2021195245',
		'hidden': false,
		'id': 'relation2002708380',
		'maxSelect': 999,
		'minSelect': 0,
		'name': 'geo',
		'presentable': false,
		'required': true,
		'system': false,
		'type': 'relation'
	}))

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_1302879749')

	// update field
	collection.fields.addAt(1, new Field({
		'cascadeDelete': false,
		'collectionId': 'pbc_3625530119',
		'hidden': false,
		'id': 'relation1530721764',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'creative',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	// update field
	collection.fields.addAt(2, new Field({
		'cascadeDelete': false,
		'collectionId': 'pbc_2021195245',
		'hidden': false,
		'id': 'relation2002708380',
		'maxSelect': 999,
		'minSelect': 0,
		'name': 'geo',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	return app.save(collection)
})
