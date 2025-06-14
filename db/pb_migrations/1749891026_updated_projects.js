/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("m56e1yllu84444p")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id = buyer"
  }, collection)

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "xh49dsy2",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "buyer",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("m56e1yllu84444p")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id = creator"
  }, collection)

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "xh49dsy2",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "creator",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
