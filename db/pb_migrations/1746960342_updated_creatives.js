/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3625530119")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "n2cxzmqlq6yhgtm",
    "hidden": false,
    "id": "relation3112513328",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "preview",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3625530119")

  // remove field
  collection.fields.removeById("relation3112513328")

  return app.save(collection)
})
