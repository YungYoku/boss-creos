import { emptyCreative, type ICreative } from '@/types/creative'
import { type CellFormats, useAdapter as useAdapterRoot } from '@/plugins/adapter'
import { CellActions } from '@/components/elements'
import { Http } from '@/plugins'
import { datetime } from '@/plugins/datetime'
import locale from '@/locale'
import { useToast } from '@/stores/toast.ts'

export const useAdapter = () => {
	const toast = useToast()

	const unnecessaryFieldsForRequest: Partial<keyof ICreative>[] = [
		'collectionId',
		'collectionName'
	]

	const unnecessaryFieldsForTable: Partial<keyof ICreative>[] = [
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
							...item.changes,
							changes: null,
							status: 'approved'
						})
						.then(res => {
							toast.set(`Успех, ${res.id}`)
						})
				}
			},
			'preview': {
				link: {
					new: preview ? `${import.meta.env.VITE_API}/files/${preview.collectionId}/${preview.id}/${preview.watermarked_image}` : '',
					current: preview ? `${import.meta.env.VITE_API}/files/${preview.collectionId}/${preview.id}/${preview.watermarked_image}` : ''
				}
			},
			'video': {
				link: {
					new: video ? `${import.meta.env.VITE_API}/files/${video.collectionId}/${video.id}/${video.watermarked_video}` : '',
					current: video ? `${import.meta.env.VITE_API}/files/${video.collectionId}/${video.id}/${video.watermarked_video}` : ''
				}
			}
		}
	}

	const cellFormats: CellFormats<ICreative> = {
		'approach': (approach) => approach?.name ?? null,
		'creator': (creator) => creator?.username ?? null,
		'geo': (geo) => geo?.name ?? null,
		'slot': (slot) => slot?.name ?? null,
		'preview': () => 'Ссылка',
		'video': () => 'Ссылка',
		'created': (created) => datetime.get(created, 'datetime'),
		'updated': (updated) => datetime.get(updated, 'datetime'),
		'resize': (resize) => locale.t(resize ? 'true' : 'false'),
		'reskin': (reskin) => locale.t(reskin ? 'true' : 'false'),
		'watermark': (watermark) => locale.t(watermark ? 'true' : 'false'),
		'unavailableGeo': (unavailableGeo) => {
			if (unavailableGeo?.length) {
				unavailableGeo.map(item => item.name)
			}
			return []
		}
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
