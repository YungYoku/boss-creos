import { emptyCreative, ICreative } from '@/interfaces/Creative.ts'
import { useAdapter as useAdapterRoot } from '@/plugins/adapter.ts'

export const useAdapter = () => {
	const unnecessaryFieldsForRequest: Array<Partial<keyof ICreative>> = [
		'collectionId',
		'collectionName'
	]

	const unnecessaryFieldsForTable: Array<Partial<keyof ICreative>> = [
		'changes',
		'expand'
	]

	const {
		handleLoadedData,
		header,
		body,
		fields
	} = useAdapterRoot(emptyCreative, unnecessaryFieldsForRequest, unnecessaryFieldsForTable)

	return {
		handleLoadedData,
		header,
		body,
		fields
	}
}
