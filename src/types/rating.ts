import type { IUser } from '@/types/user'
import type { DBRecord } from '@/types/dbBase'

export type IRating = DBRecord & {
	by: string
	created: string
	id:	string
	review: string
	stars: number
	updated: string,
	expand?: {
		by?: IUser
	}
}

export const emptyRating: IRating = {
	by: '',
	collectionId: '',
	collectionName: '',
	created: '',
	id: '',
	review: '',
	stars: 0,
	updated: ''
}
