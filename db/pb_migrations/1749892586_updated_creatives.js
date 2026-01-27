/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// update field
	collection.fields.addAt(11, new Field({
		'hidden': false,
		'id': 'select3092164551',
		'maxSelect': 1,
		'name': 'ratio',
		'presentable': false,
		'required': true,
		'system': false,
		'type': 'select',
		'values': [
			'1:1',
			'2:3',
			'3:2',
			'3:4',
			'4:3',
			'4:5',
			'9:16',
			'16:9'
		]
	}))

	return app.save(collection)
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_3625530119')

	// update field
	collection.fields.addAt(11, new Field({
		'hidden': false,
		'id': 'select3092164551',
		'maxSelect': 1,
		'name': 'ratio',
		'presentable': false,
		'required': true,
		'system': false,
		'type': 'select',
		'values': [
			'1:1',
			'2:3',
			'3:2',
			'3:4',
			'4:5',
			'9:16',
			'16:9'
		]
	}))

	return app.save(collection)
})
