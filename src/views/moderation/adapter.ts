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

	const cellFormats = {
		'approach': ({ name }) => name,
		'creator': ({ username }) => username,
		'geo': ({ name }) => name,
		'slot': ({ name }) => name,
	}

	const cells = {
		'actions': CellButton
	}

	const {
		handleLoadedData,
		header,
		body,
		fields,
	} = useAdapterRoot(emptyCreative, unnecessaryFieldsForRequest, unnecessaryFieldsForTable, options, cellFormats)

	return {
		handleLoadedData,
		header,
		body,
		fields,
		cells
	}
}
