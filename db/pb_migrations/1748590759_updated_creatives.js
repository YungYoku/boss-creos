/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3625530119")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select2363381545",
    "maxSelect": 1,
    "name": "type",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "video",
      "static",
      "pwa"
    ]
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_53644091",
    "hidden": false,
    "id": "relation2886606951",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "slot",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation3154569827",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "creator",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(10, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3879352972",
    "hidden": false,
    "id": "relation986875461",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "approach",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "select3092164551",
    "maxSelect": 1,
    "name": "ratio",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "1:1",
      "2:3",
      "3:2",
      "3:4",
      "4:5",
      "9:16",
      "16:9"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3625530119")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select2363381545",
    "maxSelect": 1,
    "name": "type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "video",
      "static",
      "pwa"
    ]
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_53644091",
    "hidden": false,
    "id": "relation2886606951",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "slot",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation3154569827",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "creator",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(10, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3879352972",
    "hidden": false,
    "id": "relation986875461",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "approach",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "select3092164551",
    "maxSelect": 1,
    "name": "ratio",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "1:1",
      "2:3",
      "3:2",
      "3:4",
      "4:5",
      "9:16",
      "16:9"
    ]
  }))

  return app.save(collection)
})
