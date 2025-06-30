import type { Ref } from 'vue'
import { App, ref } from 'vue'

import ruTable from './ru/table.json'

export const locales = {
	ru: {
		...ruTable
	},
	en: {
		...ruTable
	},
}

type DefaultLang = 'en' | 'ru'

type Locales<Lang extends string = DefaultLang> = Record<Lang, { [key: string]: string }>

class Localize<Lang extends string = DefaultLang> {
	readonly baseLocale: DefaultLang = 'en'

	locale: Ref<Lang | DefaultLang> = ref(this.baseLocale)
	locales: Locales<Lang | DefaultLang> = {
		en: {},
		ru: {}
	} as Locales<Lang | DefaultLang>

	static inst: Localize
	static getInst() {
		return Localize.inst || (Localize.inst = new Localize())
	}

	install(app: App, { locales }: { locales: Locales<Lang> }) {
		const keys = Object.keys(locales) as Lang[]
		keys.forEach(key => {
			this.locales[key] = this.locales[key] || {}
			this.locales[key] = { ...this.locales[key], ...locales[key] }
		})

		app.config.globalProperties.$t = (key: string, values?: object) => this.t(key, values)
		app.config.globalProperties.$e = (key: string, values?: object) => this.e(key, values)
		app.config.globalProperties.$locale = (locale: Lang) => {
			if (locale) {
				return this.setLocale(locale)
			} else {
				return this.getLocale()
			}
		}
		app.config.globalProperties.$locales = () => Object.keys(this.locales)
	}


	getTemplate(template: string, values?: string | object) {
		try {
			if (typeof values === 'string') {
				values = JSON.parse(values)
			}
		} catch (e) {
			console.warn(e)
			return template
		}

		if (typeof values === 'object') {
			const keys = Object.keys(values) as Array<keyof typeof values>
			keys.forEach((optionKey) => {
				const option = values[optionKey]
				template = template.split(`:${optionKey}`).join(option)
			})
		}
		return template
	}

	t(key: string, values?: object) {
		const langData = this.locales[this.getLocale()] || this.locales[this.baseLocale] || {}
		const template = langData[key]

		return langData[key] ? this.getTemplate(template, values) : key
	}

	e(key: string, values?: object) {
		const langData = this.locales[this.getLocale()] || {}
		const template = langData[key] || key

		return this.getTemplate(template, values)
	}

	getLocale() {
		return this.getFromStore() || this.locale.value
	}

	setLocale(locale: Lang | DefaultLang) {
		this.locale.value = locale
		this.setToStore(locale)
	}

	getFromStore() {
		return this.locale.value
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setToStore(_: Lang | DefaultLang) {
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

	addToLocaleFromMeta(data: { [key: string]: { text: string } }, namespace: string) {
		const keys = Object.keys(data) as Array<keyof typeof data>
		keys.forEach(key => {
			const name = `${namespace}.${key}`
			this.addToLocale(name, data[key].text)
		})
	}

	addToLocale(name: string, value: string) {
		const locale = this.getLocale()
		const langData = this.locales[locale] as Record<string, string>
		langData[name] = value
	}
}

const localize = Localize.getInst()
export default localize