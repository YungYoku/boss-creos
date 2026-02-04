import type {Method} from '@/plugins/datetime'
import type {FormatType} from '@/plugins/format'

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$date: (date: Date | string | null, key?: Method) => string
		$format: (type: FormatType, value: number, ...props: number[]) => string
		$t: (key: string) => string | undefined
	}
}
