/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// update field
	collection.fields.addAt(20, new Field({
		'hidden': false,
		'id': 'select2063623452',
		'maxSelect': 1,
		'name': 'status',
		'presentable': false,
		'required': true,
		'system': false,
		'type': 'select',
		'values': [
			'moderation',
			'approved'
		]
	}))

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// update field
	collection.fields.addAt(20, new Field({
		'hidden': false,
		'id': 'select2063623452',
		'maxSelect': 1,
		'name': 'status',
		'presentable': false,
		'required': false,
		'system': false,
		'type': 'select',
		'values': [
			'moderation',
			'approved'
		]
	}))

	return app.save(collection)
})
