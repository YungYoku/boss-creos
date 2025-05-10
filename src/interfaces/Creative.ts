import { IUser } from '@/interfaces/User.ts'
import { IChat } from '@/interfaces/Chat.ts'
import { IProjectProposal } from '@/interfaces/Project.ts'

export interface ICreativeProposal {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	user: string
	chat: string
	text: string
	price: number
	expand?: {
		user?: IUser
		chat?: IChat
	}
}

export const emptyProposal: ICreativeProposal = {
	id: '',
	collectionId: '',
	collectionName: '',
	created: '',
	updated: '',
	user: '',
	chat: '',
	text: '',
	price: 0
}

export interface ICreative {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	title: string
	creator: string
	price: number
	proposals: Array<string>
	expand?: {
		creator?: IUser
		proposals?: Array<IProjectProposal>
	}
}

export const emptyCreative: ICreative = {
	collectionId: '',
	collectionName: '',
	created: '',
	updated: '',
	creator: '',
	id: '',
	title: '',
	price: 0,
	proposals: [],
	expand: {
		proposals: []
	}
}

export interface ICreatives {
	items: Array<ICreative>
	page: number
	perPage: number
	totalItems: number
	totalPages: number
}