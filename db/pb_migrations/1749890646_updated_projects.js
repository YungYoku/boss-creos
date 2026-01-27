/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('m56e1yllu84444p')

	// update field
	collection.fields.addAt(11, new Field({
		'cascadeDelete': false,
		'collectionId': 'fyjp1lcddj3r8wm',
		'hidden': false,
		'id': 'xbggzsje',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'ratingDesigner',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	// update field
	collection.fields.addAt(12, new Field({
		'cascadeDelete': false,
		'collectionId': 'fyjp1lcddj3r8wm',
		'hidden': false,
		'id': 'knrq0v3i',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'ratingBuyer',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('m56e1yllu84444p')

	// update field
	collection.fields.addAt(11, new Field({
		'cascadeDelete': false,
		'collectionId': 'fyjp1lcddj3r8wm',
		'hidden': false,
		'id': 'xbggzsje',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'ratingExecutor',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	// update field
	collection.fields.addAt(12, new Field({
		'cascadeDelete': false,
		'collectionId': 'fyjp1lcddj3r8wm',
		'hidden': false,
		'id': 'knrq0v3i',
		'maxSelect': 1,
		'minSelect': 0,
		'name': 'ratingCreator',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'relation'
	}))

	return app.save(collection)
})
