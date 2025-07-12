import { emptyCreative, ICreative } from '@/interfaces/Creative.ts'
import { useAdapter as useAdapterRoot } from '@/plugins/adapter.ts'
import { CellActions } from '@/components/elements'
import { Http } from '@/plugins'
import { datetime } from '@/plugins/datetime.ts'
import locale from '@/locale'

export const useAdapter = () => {
	const unnecessaryFieldsForRequest: Array<Partial<keyof ICreative>> = [
		'collectionId',
		'collectionName'
	]

	const unnecessaryFieldsForTable: Array<Partial<keyof ICreative>> = [
		'changes',
		'expand'
	]

	const options = (item: ICreative) => {
		const preview = item.expand?.preview
		const video = item.expand?.video
		return {
			'actions': {
				handler: async () => {
					await Http
						.patch<ICreative>(`/collections/creatives/records/${item.id}`, {
							...item,
							changes: null,
							status: 'approved'
						})
						.then(res => {
							console.log(res)
						})
				}
			},
			'preview': {
				link: {
					new: `${import.meta.env.VITE_API}/files/${preview?.collectionId}/${preview?.id}/${preview?.file}`,
					current: `${import.meta.env.VITE_API}/files/${preview?.collectionId}/${preview?.id}/${preview?.file}`,
				}
			},
			'video': {
				link: {
					new: `${import.meta.env.VITE_API}/files/${video?.collectionId}/${video?.id}/${video?.file}`,
					current: `${import.meta.env.VITE_API}/files/${video?.collectionId}/${video?.id}/${video?.file}`,
				}
			}
		}
	}

	const cellFormats: Record<keyof ICreative, (param: keyof ICreative) => unknown> = {
		'approach': ({ name }) => name,
		'creator': ({ username }) => username,
		'geo': ({ name }) => name,
		'slot': ({ name }) => name,
		'preview': () => 'Ссылка',
		'video': () => 'Ссылка',
		'created': (created) => datetime.get(created, 'datetime'),
		'updated': (updated) => datetime.get(updated, 'datetime'),
		'resize': (resize) => locale.t(resize),
		'reskin': (reskin) => locale.t(reskin),
		'watermark': (watermark) => locale.t(watermark),
	}

	const cells = {
		'actions': CellActions,
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
