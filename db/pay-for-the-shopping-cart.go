package main

import (
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"net/http"
)

func payForTheShoppingCart(c *core.RequestEvent) error {
	authRecord := c.Auth
	if authRecord == nil {
		return apis.NewUnauthorizedError("Вы не авторизованы", nil)
	}

	basketsIds := authRecord.GetStringSlice("baskets")

	totalPrice := 0.0
	for _, basketID := range basketsIds {
		basketRecord, err := app.FindRecordById("baskets", basketID)
		if err != nil {
			continue
		}

		status := basketRecord.GetString("status")
		if status == "moderation" {
			continue
		}

		creativeID := basketRecord.GetString("creative")
		if creativeID == "" {
			continue
		}

		creativeRecord, err := app.FindRecordById("creatives", creativeID)
		if err != nil {
			continue
		}

		price := creativeRecord.GetFloat("price")

		geoIDs := basketRecord.GetStringSlice("geo")

		geoLength := len(geoIDs)

		totalPrice += price * float64(geoLength)
	}

	balance := authRecord.GetFloat("balance")

	if (balance >= totalPrice) {
		for _, basketID := range basketsIds {
			basketRecord, err := app.FindRecordById("baskets", basketID)
			if err != nil {
				continue
			}

			status := basketRecord.GetString("status")
			if status != "created" {
				continue
			}

			basketRecord.Set("status", "in-progress")
			if err := app.Save(basketRecord); err != nil {
				continue
			}

			creativeID := basketRecord.GetString("creative")
			creativeRecord, err := app.FindRecordById("creatives", creativeID)
			if err != nil {
				continue
			}

			cartGeo := basketRecord.GetStringSlice("geo")
			unavailableGeo := creativeRecord.GetStringSlice("unavailableGeo")

			combinedUnavailableGeo := append(unavailableGeo, cartGeo...)

			creativeRecord.Set("unavailableGeo", combinedUnavailableGeo)

			if err := app.Save(creativeRecord); err != nil {
				continue
			}

			authRecord.Set("balance", balance - totalPrice)
			if err := app.Save(authRecord); err != nil {
				return apis.NewApiError(http.StatusInternalServerError, "Failed to update user's baskets", err)
			}
		}
	}

	user, err := app.FindRecordById("users", authRecord.GetString("id"))
	if err != nil {
		return c.JSON(http.StatusBadGateway, nil)
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