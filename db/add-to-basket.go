package main

import (
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"net/http"
)

func addToBasket(c *core.RequestEvent) error {
	authRecord := c.Auth
	if authRecord == nil {
		return apis.NewUnauthorizedError("Вы не авторизованы", nil)
	}

	data := struct {
		Creative string   `json:"creative" form:"creative"`
		Geo      []string `json:"geo"      form:"geo"`
	}{}

	if err := c.BindBody(&data); err != nil {
		return c.BadRequestError("Failed to read request data", err)
	}

	if len(data.Geo) == 0 {
		return c.BadRequestError("Необходимо указать хотя бы одно гео", nil)
	}

	basketsCollection, err := app.FindCollectionByNameOrId("baskets")
	if err != nil {
		return apis.NewNotFoundError("Baskets collection not found.", err)
	}

	// Собираем все ID новых корзин
	var newBasketsIds []string

	// Итерируемся по каждому гео и создаем отдельную корзину
	for _, geo := range data.Geo {
		basketRecord := core.NewRecord(basketsCollection)
		basketRecord.Set("creative", data.Creative)
		basketRecord.Set("geo", geo)
		basketRecord.Set("status", "created")

		if err := app.Save(basketRecord); err != nil {
			return apis.NewApiError(http.StatusInternalServerError, "Failed to create basket record", err)
		}

		newBasketsIds = append(newBasketsIds, basketRecord.Id)
	}

	// Добавляем ID новых корзин к списку корзин пользователя
	basketsIds := authRecord.GetStringSlice("baskets")
	basketsIds = append(basketsIds, newBasketsIds...)

	authRecord.Set("baskets", basketsIds)

	if err := app.Save(authRecord); err != nil {
		return apis.NewApiError(http.StatusInternalServerError, "Failed to update user's baskets", err)
	}

	user, err := app.FindRecordById("users", authRecord.GetString("id"))
	if err != nil {
		return apis.NewApiError(http.StatusInternalServerError, "Failed to find user record", err)
	}

	expand := []string{
		"baskets",
		"baskets.creative",
		"baskets.creative.preview",
		"baskets.creative.slot",
		"baskets.geo",
	}

	errs := app.ExpandRecord(user, expand, nil)
	if len(errs) > 0 {
		return apis.NewApiError(http.StatusInternalServerError, "Failed to expand user records", err)
	}

	return c.JSON(http.StatusOK, user)
}