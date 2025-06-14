/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1302879749")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select1887309346",
    "maxSelect": 8,
    "name": "resize",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "1:1",
      "2:3",
      "3:2",
      "3:4",
      "4:3",
      "4:5",
      "9:16",
      "16:9"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1302879749")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select1887309346",
    "maxSelect": 1,
    "name": "resize",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "1:1",
      "2:3",
      "3:2",
      "3:4",
      "4:3",
      "4:5",
      "9:16",
      "16:9"
    ]
  }))

  return app.save(collection)
})
