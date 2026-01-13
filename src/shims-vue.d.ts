import type { Method } from '@/plugins/datetime'
import type { FormatType } from '@/plugins/format'

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

// Works correctly
export {}

declare module 'vue' {
	interface ComponentCustomProperties {
		$date: (date: Date | string | null, key: Method = 'default') => string,
		$format: (type: FormatType, value: number, ...props: Array<number>) => string
		$t: (key: string) => string | undefined
	}
}