import { emptyUser, IUser } from '@/types/user.ts'
import { CellFormats, useAdapter as useAdapterRoot } from '@/plugins/adapter.ts'
import { CellActions } from '@/components/elements'
import { Http } from '@/plugins'
import { datetime } from '@/plugins/datetime.ts'
import locale from '@/locale'

export const useAdapter = () => {
	const unnecessaryFieldsForRequest: Array<Partial<keyof IUser>> = [
		'collectionId',
		'collectionName',
		'emailVisibility',
		'rating',
		'verified',
		'energy',
		'favorite',
		'referral_code',
		'notifications',
		'baskets',
		'transactions'
	]

	const unnecessaryFieldsForTable: Array<Partial<keyof IUser>> = [
		'changes',
		'expand'
	]

	const options = (item: IUser) => {
		const avatar = item.expand?.avatar
		return {
			'actions': {
				handler: async () => {
					await Http
						.patch<IUser>(`/collections/users/records/${item.id}`, {
							...item,
							...item.changes,
							changes: null,
							status: 'approved'
						})
						.then(res => {
							console.log(res)
						})
				}
			},
			'avatar': {
				link: {
					new: `${import.meta.env.VITE_API}/files/${avatar?.collectionId}/${avatar?.id}/${avatar?.watermarked_image}`,
					current: `${import.meta.env.VITE_API}/files/${avatar?.collectionId}/${avatar?.id}/${avatar?.watermarked_image}`,
				}
			},
		}
	}

	const cellFormats: CellFormats<IUser> = {
		'avatar': () => 'Ссылка',
		'created': (created) => datetime.get(created, 'datetime'),
		'updated': (updated) => datetime.get(updated, 'datetime'),
		'role': (role) => locale.t(role),
		'status': (status) => locale.t(status),
	}

	const cells = {
		'actions': CellActions,
	}

	const {
		handleLoadedData,
		header,
		body,
		fields,
	} = useAdapterRoot(emptyUser, unnecessaryFieldsForRequest, unnecessaryFieldsForTable, options, cellFormats)

	return {
		handleLoadedData,
		header,
		body,
		fields,
		cells
	}
}
