/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3625530119")

  // remove field
  collection.fields.removeById("number1790274534")

  // remove field
  collection.fields.removeById("number380329097")

  // remove field
  collection.fields.removeById("number2025282910")

  // remove field
  collection.fields.removeById("number2844941882")

  // remove field
  collection.fields.removeById("number3081332655")

  // remove field
  collection.fields.removeById("number1715780929")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3625530119")

  // add field
  collection.fields.addAt(18, new Field({
    "hidden": false,
    "id": "number1790274534",
    "max": null,
    "min": null,
    "name": "resizePrice11",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(19, new Field({
    "hidden": false,
    "id": "number380329097",
    "max": null,
    "min": null,
    "name": "resizePrice23",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(20, new Field({
    "hidden": false,
    "id": "number2025282910",
    "max": null,
    "min": null,
    "name": "resizePrice32",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(21, new Field({
    "hidden": false,
    "id": "number2844941882",
    "max": null,
    "min": null,
    "name": "resizePrice45",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(22, new Field({
    "hidden": false,
    "id": "number3081332655",
    "max": null,
    "min": null,
    "name": "resizePrice916",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(23, new Field({
    "hidden": false,
    "id": "number1715780929",
    "max": null,
    "min": null,
    "name": "resizePrice169",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
