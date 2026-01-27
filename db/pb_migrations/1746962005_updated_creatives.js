/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// update field
	collection.fields.addAt(5, new Field({
		'cascadeDelete': false,
		'collectionId': 'n2cxzmqlq6yhgtm',
		'hidden': false,
		'id': 'relation3112513328',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'preview',
		'presentable': false,
		'required': true,
		'system': false,
		'type': 'relation'
	}))

	// update field
	collection.fields.addAt(7, new Field({
		'cascadeDelete': false,
		'collectionId': 'n2cxzmqlq6yhgtm',
		'hidden': false,
		'id': 'relation2093472300',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'video',
		'presentable': false,
		'required': true,
		'system': false,
		'type': 'relation'
	}))

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// update field
	collection.fields.addAt(5, new Field({
		'cascadeDelete': false,
		'collectionId': 'n2cxzmqlq6yhgtm',
		'hidden': false,
		'id': 'relation3112513328',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'preview',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	// update field
	collection.fields.addAt(7, new Field({
		'cascadeDelete': false,
		'collectionId': 'n2cxzmqlq6yhgtm',
		'hidden': false,
		'id': 'relation2093472300',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'video',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	return app.save(collection)
})
