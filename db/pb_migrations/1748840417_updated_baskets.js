/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1302879749")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool1887309346",
    "name": "resize",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "bool2244428374",
    "name": "reskin",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1302879749")

  // remove field
  collection.fields.removeById("bool1887309346")

  // remove field
  collection.fields.removeById("bool2244428374")

  return app.save(collection)
})
