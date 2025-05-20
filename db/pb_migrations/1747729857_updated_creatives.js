/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3625530119")

  // add field
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3625530119")

  // remove field
  collection.fields.removeById("relation986875461")

  return app.save(collection)
})
