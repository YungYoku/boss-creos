import { IRow } from '@/interfaces/Table.ts'

export const useAdapter = <T extends object>() => {
	const generateHeader = (item: T) => {
		const keys = Object.keys(item)
		return keys.map(name => ({ name }))
	}

	const generateBody = (items: Array<T>) => {
		return items.map(item => {
			const keys = Object.keys(item) as Array<keyof T>
			return keys.reduce((result, key) => {
				const value = item[key]
				result.push({
					key: String(key),
					value
				})
				return result
			}, [] as IRow)
		})
	}

	return {
		generateHeader,
		generateBody
	}
}