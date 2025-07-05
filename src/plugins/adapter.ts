import { ref, Ref } from 'vue'
import { IHeader, IRow, IRows } from '@/interfaces/Table.ts'

export const useAdapter = <T extends object>(
	schema: T,
	unnecessaryFieldsForRequest: Array<Partial<keyof T>>,
	unnecessaryFieldsForTable: Array<Partial<keyof T>>
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
				value: null
			}] as IRow
			filteredKeys.forEach((key) => {
				const value = item[key]
				result.push({
					key: String(key),
					value
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
		fields: fieldsForRequest
	}
}