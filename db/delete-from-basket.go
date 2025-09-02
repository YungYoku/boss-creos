package main

import (
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"net/http"
)

func removeStrings(slice1, slice2 []string) []string {
	// 1. Create a map for efficient lookups of strings to be removed.
	toRemove := make(map[string]struct{})
	for _, s := range slice2 {
		toRemove[s] = struct{}{}
	}

	// 2. Iterate through the first slice and build a new one.
	var result []string
	for _, s := range slice1 {
		// 3. Check if the string exists in the map.
		if _, found := toRemove[s]; !found {
			// 4. If not found, append it to the result slice.
			result = append(result, s)
		}
	}
	return result
}

func removeByValue(slice []string, val string) []string {
    // 1. Ищем индекс первого вхождения значения.
    for i, v := range slice {
        if v == val {
            // 2. Если элемент найден, объединяем части слайса без него.
            // ... - это оператор "распаковки", он добавляет все элементы второго слайса в первый.
            return append(slice[:i], slice[i+1:]...)
        }
    }
    // Если значение не найдено, возвращаем исходный слайс без изменений.
    return slice
}

func deleteFromBasket(c *core.RequestEvent) error {
	authRecord := c.Auth
	if authRecord == nil {
		return apis.NewUnauthorizedError("Вы не авторизованы", nil)
	}

	data := struct {
		Basket string     `json:"basket"   form:"basket"`
	}{}

	if err := c.BindBody(&data); err != nil {
		return c.BadRequestError("Failed to read request data", err)
	}

	if len(data.Basket) == 0 {
		return c.BadRequestError("Необходимо указать хотя бы одно гео", nil)
	}

	basketRecord, err := app.FindRecordById("baskets", data.Basket)
	if err != nil {
		return apis.NewNotFoundError("Basket not found.", err)
	}

	// Удаление гео корзины из недоступных гео креатива
	creativeRecord, err := app.FindRecordById("creatives", basketRecord.GetString("creative"))
	if err != nil {
		return apis.NewNotFoundError("Creative not found.", err)
	}

	unavailableGeo := creativeRecord.GetStringSlice("unavailableGeo")

	cleanedGeo := removeStrings(unavailableGeo, basketRecord.GetStringSlice("geo"))
	creativeRecord.Set("unavailableGeo", cleanedGeo)

	if err := app.Save(creativeRecord); err != nil {
		return apis.NewNotFoundError("Save error.", err)
	}

	// Удаляем ID корзины из списка корзин пользователя
	basketsIds := authRecord.GetStringSlice("baskets")
	basketsIds = removeByValue(basketsIds, data.Basket)

	authRecord.Set("baskets", basketsIds)

	if err := app.Save(authRecord); err != nil {
		return apis.NewApiError(http.StatusInternalServerError, "Failed to update user's baskets", err)
	}

	// Удаляем корзину
	err = app.Delete(basketRecord)
	if err != nil {
	    return err
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