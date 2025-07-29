package main

import (
   	"log"

    "github.com/pocketbase/pocketbase"
    "github.com/pocketbase/pocketbase/core"
)

var(
	app = pocketbase.New()
)

func main() {
    app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/upload/video", uploadVideo)
		se.Router.POST("/api/upload/image", uploadImage)
		se.Router.POST("/api/baskets/add", addToBasket)
		se.Router.POST("/api/baskets/pay", payForTheShoppingCart)

        return se.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
