import { IUser } from '@/interfaces/User.ts'
import type { DBRecord } from '@/interfaces/DBBase.ts'

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
