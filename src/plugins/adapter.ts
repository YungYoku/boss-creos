import { ref, type Ref } from 'vue'
import type { ICellOptions, IHeader, IRow, IRows } from '@/types/table'

type ItemExpand<T> = T extends { expand?: infer E } ? E : never
type ExpandedProperty<T, K extends keyof T> = K extends keyof ItemExpand<T>
	? ItemExpand<T>[K]
	: never
type ExpandedOrDirectProperty<T, K extends keyof T> = K extends keyof ItemExpand<T>
	? ItemExpand<T>[K]
	: K extends keyof T
		? T[K]
		: never

interface AdditionalAdapterFields<T> {
	expand?: {
		[key in keyof T]?: ExpandedProperty<T, key>
	}
	changes?: Partial<T> | null
}
type AdapterItem<T> = T & AdditionalAdapterFields<T>

export type CellFormats<T> = {
	[K in keyof T]?: (param: ExpandedOrDirectProperty<T, K>) => unknown
}

interface BaseOptions {
	actions?: ICellOptions
}
type Options<T> = BaseOptions & {
	[key in keyof T]?: ICellOptions
}

export const useAdapter = <T extends AdditionalAdapterFields<T>, Keys extends keyof T = keyof T>(
	elementSchema: T,
	unnecessaryFieldsForRequest: Keys[],
	unnecessaryFieldsForTable: Keys[],
	options: (item: T) => Options<T>,
	cellFormats: CellFormats<T>,
) => {
	const keys = Object.keys(elementSchema) as Keys[]

	const fieldsForRequest = keys.filter(
		(field) => !unnecessaryFieldsForRequest.includes(field),
	) as string[]
	const fieldsForTable = keys.filter((field) => !unnecessaryFieldsForTable.includes(field))

	const getHeader = (item: T) => {
		const keys = Object.keys(item) as Keys[]
		const filteredKeys = keys.filter((name) => fieldsForTable.includes(name))
		const result = filteredKeys.map((name) => ({ name: String(name) }))

		return [{ name: 'actions' }, ...result]
	}

	const getValue = (item: AdapterItem<T>, key: keyof AdapterItem<T>) => {
		if (item.expand?.[key]) {
			return item.expand[key] as ExpandedOrDirectProperty<T, Keys>
		}
		return item[key] as ExpandedOrDirectProperty<T, Keys>
	}

	const getBody = (items: AdapterItem<T>[]) => {
		return items.map((item) => {
			const keys = Object.keys(item) as Keys[]
			const filteredKeys = keys.filter((name) => fieldsForTable.includes(name))

			const result = [
				{
					key: 'actions',
					newValue: null,
					options: options(item).actions,
				},
			] as IRow
			filteredKeys.forEach((key) => {
				const value = getValue(item, key)
				const format = cellFormats[key] ? cellFormats[key] : <V>(value: V) => value

				result.push({
					key: String(key),
					options: options(item)[key] ?? {},
					newValue: item.changes?.[key] ?? null,
					currentValue: format(value),
				})
			})
			return result
		})
	}

	const header: Ref<IHeader> = ref([])
	const body: Ref<IRows> = ref([])
	const handleLoadedData = (data: AdapterItem<T>[]) => {
		if (data.length > 0 && data[0]) {
			header.value = getHeader(data[0])
			body.value = getBody(data)
		} else {
			header.value = []
			body.value = []
		}
	}

	return {
		handleLoadedData,
		header,
		body,
		fields: fieldsForRequest,
	}
}