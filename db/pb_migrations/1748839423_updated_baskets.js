/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1302879749")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3348329471",
    "hidden": false,
    "id": "relation3379474102",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "descriptions",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1302879749")

  // remove field
  collection.fields.removeById("relation3379474102")

  return app.save(collection)
})
