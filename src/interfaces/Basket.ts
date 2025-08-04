import { ICreative, IGeo, IRatio } from '@/interfaces/Creative.ts'

export interface IBasket {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	creative: string
	geo: Array<string>
	resize: Array<IRatio>
	reskin: boolean
	comment: string
	status: 'created' | 'pending' | 'in-progress' | 'done'
	expand?: {
		creative?: ICreative
		geo?: Array<IGeo>
	}
}

export interface IBaskets {
	items: Array<IBasket>
	page: number
	perPage: number
	totalItems: number
	totalPages: number
}