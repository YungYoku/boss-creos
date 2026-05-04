import { test, expect } from '@playwright/test'

test('login test', async ({ page }) => {
	// Переход на страницу логина
	await page.goto('http://localhost:5173/login')

	// Ввод логина
	await page.fill('input[type="text"]', 'yungyoku@yandex.ru')

	// Ввод пароля
	await page.fill('input[type="password"]', 'yungyoku@yandex.ru')

	// Клик по кнопке "Войти"
	await page.click('button:has-text("Войти")')

	// Пример проверки (замени под свой кейс)
	await expect(page).toHaveURL('http://localhost:5173/')
})