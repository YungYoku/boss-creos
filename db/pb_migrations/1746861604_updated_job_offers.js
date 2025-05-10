/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("m56e1yllu84444p")

  // update collection data
  unmarshal({
    "name": "projects"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("m56e1yllu84444p")

  // update collection data
  unmarshal({
    "name": "job_offers"
  }, collection)

  return app.save(collection)
})
