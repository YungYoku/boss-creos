import { ref, Ref } from 'vue'
import type { ICellOptions, IHeader, IRow, IRows } from '@/interfaces/Table.ts'

interface BaseAdapterFields<T extends object> {
	expand?: {
		[key in keyof T]?: T[key]
	}
	changes: Partial<T> | null
}
type AdapterItem<T extends object> = T & BaseAdapterFields<T>

type BaseOptions = {
	actions?: ICellOptions
}
type Options<T> = BaseOptions & {
	[key in keyof T]?: ICellOptions
}

export const useAdapter = <T extends object>(
	schema: AdapterItem<T>,
	unnecessaryFieldsForRequest: Array<Partial<keyof T>>,
	unnecessaryFieldsForTable: Array<Partial<keyof T>>,
	options: (item: T) => Options<T>,
	cellFormats: Partial<Record<keyof T, (item?: T[keyof T]) => unknown>>,
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