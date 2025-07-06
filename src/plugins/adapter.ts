import { ref, Ref } from 'vue'
import type { ICellOptions, IHeader, IRow, IRows } from '@/interfaces/Table.ts'

type NecessaryAdapterFields<T> = {
	changes: Partial<T> | null
	[key: string]: unknown
}

type Options<T> = {
	[key in keyof T]?: ICellOptions
}

export const useAdapter = <T extends NecessaryAdapterFields<T>>(
	schema: T,
	unnecessaryFieldsForRequest: Array<Partial<keyof T>>,
	unnecessaryFieldsForTable: Array<Partial<keyof T>>,
	options: () => Options<T>
) => {
	const keys = Object.keys(schema) as Array<keyof T>

	const fieldsForRequest = keys.filter(field => !unnecessaryFieldsForRequest.includes(field))
	const fieldsForTable = keys.filter(field => !unnecessaryFieldsForTable.includes(field))

	const getHeader = (item: T) => {
		const keys = Object.keys(item) as Array<keyof T>
		const filteredKeys = keys.filter(name => fieldsForTable.includes(name))
		const result = filteredKeys.map(name => ({ name: String(name) }))

		return [{ name: 'actions' }, ...result]
	}

	const getBody = (items: Array<T>) => {
		return items.map(item => {
			const keys = Object.keys(item) as Array<keyof T>
			const filteredKeys = keys.filter(name => fieldsForTable.includes(name))

			const result = [{
				key: 'actions',
				newValue: null,
				options: options(item).actions
			}] as IRow
			filteredKeys.forEach((key) => {
				const value = item[key]
				result.push({
					key: String(key),
					options: options(item)[key],
					newValue: value,
					oldValue: item.changes?.[key] ?? null
				})
			})
			return result
		})
	}

	const header: Ref<IHeader> = ref([])
	const body: Ref<IRows> = ref([])
	const handleLoadedData = (data: Array<T>) => {
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