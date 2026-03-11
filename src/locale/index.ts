import type { App, Ref } from 'vue'
import { ref } from 'vue'

import en from './en/en.json'
import enTable from './en/table.json'

import ru from './ru/ru.json'
import ruTable from './ru/table.json'

const locales = {
	ru: {
		...ru,
		...ruTable
	},
	en: {
		...en,
		...enTable
	}
} as const

type DefaultLang = 'en' | 'ru'

type Locales<Lang extends string = DefaultLang> = Record<Lang, Record<string, string>>

class Localize<Lang extends string = DefaultLang> {
	readonly baseLocale: DefaultLang = 'en'

	locale: Ref<Lang | DefaultLang> = ref(this.baseLocale)
	locales: Locales<Lang | DefaultLang> = {
		en: {},
		ru: {}
	} as Locales<Lang | DefaultLang>

	constructor(locales: Locales<Lang>) {
		const keys = Object.keys(locales) as Lang[]
		keys.forEach(key => {
			this.locales[key] = { ...this.locales[key], ...locales[key] }
		})
	}

	install(app: App) {
		app.config.globalProperties.$t = (key: string) => this.t(key)
		app.config.globalProperties.$locale = (locale: Lang) => {
			if (locale) {
				this.setLocale(locale)
				return
			} else {
				return this.getLocale()
			}
		}
		app.config.globalProperties.$locales = () => Object.keys(this.locales)
	}

	t(key: string) {
		const langData = this.locales[this.getLocale()]
		return langData[key]
	}

	getLocale() {
		return this.getFromStore() || this.locale.value
	}

	setLocale(locale: Lang | DefaultLang) {
		this.locale.value = locale
	}

	getFromStore() {
		return this.locale.value
	}

	switch(locale: Lang | DefaultLang) {
		this.setLocale(locale)
	}

	detectLocale() {
		let browserLocale = window.navigator.language

		browserLocale = browserLocale.slice(0, 2).toLowerCase()
		if (Object.keys(this.locales).includes(browserLocale)) {
			return browserLocale
		}

		return null
	}
}

export default new Localize(locales)