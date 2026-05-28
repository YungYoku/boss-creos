import type { App, Plugin } from 'vue'

export type FormatType = 'percent' | 'number'

const types = {
	percent: (value: number) => `${value.toFixed(2)}%`,
	number: (value: number, length = 1) => value.toFixed(length)
} as const

class Format {
	get(type: FormatType, value: number, ...props: number[]) {
		return types[type](value, ...props)
	}
}

const format = new Format()

const formatPlugin: Plugin = {
	install(app: App) {
		app.config.globalProperties.$format = (
			type: FormatType,
			value: number,
			...props: number[]
		) => {
			return format.get(type, value, ...props)
		}
	}
}

export { format, formatPlugin }