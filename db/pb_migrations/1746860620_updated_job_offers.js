/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('m56e1yllu84444p')

	// remove field
	collection.fields.removeById('ihmon1ov')

	// remove field
	collection.fields.removeById('aqyx1z1r')

	// remove field
	collection.fields.removeById('xkiezxq0')

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('m56e1yllu84444p')

	// add field
	collection.fields.addAt(6, new Field({
		'cascadeDelete': false,
		'collectionId': 'kcdc834cfn6sjv3',
		'hidden': false,
		'id': 'ihmon1ov',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'university',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	// add field
	collection.fields.addAt(7, new Field({
		'cascadeDelete': false,
		'collectionId': 'cekci3zm5xb3o3v',
		'hidden': false,
		'id': 'aqyx1z1r',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'discipline',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	// add field
	collection.fields.addAt(9, new Field({
		'cascadeDelete': false,
		'collectionId': 'saul94eqjp3fqmg',
		'hidden': false,
		'id': 'xkiezxq0',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'type',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	return app.save(collection)
})
