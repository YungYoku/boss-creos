import { emptyCreative, ICreative } from '@/interfaces/Creative.ts'
import { useAdapter as useAdapterRoot } from '@/plugins/adapter.ts'
import { CellButton } from '@/components/elements'
import { Http } from '@/plugins'

export const useAdapter = () => {
	const unnecessaryFieldsForRequest: Array<Partial<keyof ICreative>> = [
		'collectionId',
		'collectionName'
	]

	const unnecessaryFieldsForTable: Array<Partial<keyof ICreative>> = [
		'changes',
		'expand'
	]

	const options = (item: ICreative) => ({
		'actions': {
			handler: async () => {
				await Http
					.patch<ICreative>(`/collections/creatives/records/${item.id}`, {
						...item,
						status: 'approved'
					})
					.then(res => {
						console.log(res)
					})
			}
		}
	})

	const {
		handleLoadedData,
		header,
		body,
		fields,
	} = useAdapterRoot(emptyCreative, unnecessaryFieldsForRequest, unnecessaryFieldsForTable, options)

	const cells = {
		'actions': CellButton
	}

	return {
		handleLoadedData,
		header,
		body,
		fields,
		cells
	}
}
