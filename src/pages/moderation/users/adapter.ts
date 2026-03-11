import { emptyUser, type IUser } from '@/types/user'
import { type CellFormats, useAdapter as useAdapterRoot } from '@/plugins/adapter'
import { CellActions } from '@/components/elements'
import { Http } from '@/plugins'
import { datetime } from '@/plugins/datetime'
import locale from '@/locale'
import { useToast } from '@/stores/toast'

export const useAdapter = () => {
	const toast = useToast()

	const unnecessaryFieldsForRequest: Partial<keyof IUser>[] = [
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
		'transactions',
	]

	const unnecessaryFieldsForTable: Partial<keyof IUser>[] = ['changes', 'expand']

	const options = (item: IUser) => {
		const avatar = item.expand?.avatar
		return {
			actions: {
				handler: async () => {
					await Http.patch<IUser>(`/collections/users/records/${item.id}`, {
						...item,
						...item.changes,
						changes: null,
						status: 'approved',
					}).then((res) => {
						toast.set(`Успех, ${res.id}`)
					})
				},
			},
			avatar: {
				link: {
					new: avatar
						? `${import.meta.env.VITE_API}/files/${avatar.collectionId}/${avatar.id}/${avatar.watermarked_image}`
						: '',
					current: avatar
						? `${import.meta.env.VITE_API}/files/${avatar.collectionId}/${avatar.id}/${avatar.watermarked_image}`
						: '',
				},
			},
		}
	}

	const cellFormats: CellFormats<IUser> = {
		avatar: () => 'Ссылка',
		created: (created) => datetime.get(created, 'datetime'),
		updated: (updated) => datetime.get(updated, 'datetime'),
		role: (role) => locale.t(role),
		status: (status) => locale.t(status),
	}

	const cells = {
		actions: CellActions,
	}

	const { handleLoadedData, header, body, fields } = useAdapterRoot(
		emptyUser,
		unnecessaryFieldsForRequest,
		unnecessaryFieldsForTable,
		options,
		cellFormats,
	)

	return {
		handleLoadedData,
		header,
		body,
		fields,
		cells,
	}
}