import { ref, Ref } from 'vue'
import type { ICellOptions, IHeader, IRow, IRows } from '@/interfaces/Table.ts'

type GetSpecificExpand<T> = T extends { expand: infer E } ? E : never
type Item<T> = {
	expand?: GetSpecificExpand<T>
}

interface BaseAdapterFields<T extends Item<T>> {
	expand?: GetSpecificExpand<T>
	changes?: Partial<T> | null
}
type AdapterItem<T extends Item<T>> = T & BaseAdapterFields<T>

export type CellValue<I extends Item<I>, K extends keyof I = keyof I> = K extends keyof I['expand'] ? I['expand'][K] : I[K]

export type CellFormats<I extends Item<I>> = {
	[K in keyof I]?: (param: CellValue<I, K>) => unknown
}

type BaseOptions = {
	actions?: ICellOptions
}
type Options<T> = BaseOptions & {
	[key in keyof T]?: ICellOptions
}

export const useAdapter = <T extends Item<T>>(
	schema: AdapterItem<T>,
	unnecessaryFieldsForRequest: Array<keyof T>,
	unnecessaryFieldsForTable: Array<keyof T>,
	options: (item: T) => Options<T>,
	cellFormats: CellFormats<T>,
) => {
	const keys = Object.keys(schema) as Array<keyof T>

	const fieldsForRequest = keys.filter(field => !unnecessaryFieldsForRequest.includes(field)) as Array<string>
	const fieldsForTable = keys.filter(field => !unnecessaryFieldsForTable.includes(field))

	const getHeader = (item: T) => {
		const keys = Object.keys(item) as Array<keyof T>
		const filteredKeys = keys.filter(name => fieldsForTable.includes(name))
		const result = filteredKeys.map(name => ({ name: String(name) }))

		return [{ name: 'actions' }, ...result]
	}

	const getBody = (items: Array<AdapterItem<T>>) => {
		return items.map(item => {
			const keys = Object.keys(item) as Array<keyof T>
			const filteredKeys = keys.filter(name => fieldsForTable.includes(name))

			const result = [{
				key: 'actions',
				newValue: null,
				options: options(item).actions
			}] as IRow
			filteredKeys.forEach((key) => {
				const value = item.expand?.[key] ?? item[key]
				const format = cellFormats?.[key] ? cellFormats[key] : (value: unknown) => value

				result.push({
					key: String(key),
					options: options(item)[key],
					newValue: item.changes?.[key] ?? null,
					currentValue: format(value)
				})
			})
			return result
		})
	}

	const header: Ref<IHeader> = ref([])
	const body: Ref<IRows> = ref([])
	const handleLoadedData = (data: Array<AdapterItem<T>>) => {
		if (data.length > 0) {
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