import { IUser } from '@/interfaces/User.ts'
import { IChat } from '@/interfaces/Chat.ts'
import { IProjectProposal } from '@/interfaces/Project.ts'
import { IFile } from '@/interfaces/File.ts'

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

export interface IGeo {
	id: string
	collectionId: string
	collectionName: string
	name: string
}

export interface ISlot {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	name: string
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
	type: 'video' | 'static' | 'pwa'
	geo: string
	slot: string
	preview: string
	watermark: boolean
	video: string
	expand?: {
		creator?: IUser
		proposals?: Array<IProjectProposal>
		geo?: IGeo
		slot?: ISlot
		preview?: IFile
		video?: IFile
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
	type: 'video',
	geo: '',
	slot: '',
	preview: '',
	watermark: false,
	video: '',
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