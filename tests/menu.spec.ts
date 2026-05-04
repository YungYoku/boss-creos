import { test, expect } from '@playwright/test'

test('menu test', async ({ page }) => {
	// Переход на главную страницу
	await page.goto('http://localhost:5173/')

	// Клик по пункту меню "Магазин"
	await page.click('a:has-text("Магазин")')

	// Пример проверки (замени под свой кейс)
	await expect(page).toHaveURL('http://localhost:5173/shop')
})