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

export interface IApproach {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	name: string
}

export type ICreativeType = 'video' | 'static' | 'pwa'
const _creativeTypeItems: Array<ICreativeType> = ['video', 'static', 'pwa']
export const creativeTypeItems = _creativeTypeItems
	.map(item => ({
		id: item,
		name: item
	}))

export type IRatio = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '4:5' | '9:16' | '16:9'
const _ratioItems: Array<IRatio> = ['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '9:16', '16:9']
export const ratioItems = _ratioItems
	.map(item => ({
		id: item,
		name: item
	}))

export type ResizePrices = {
	[_ in IRatio]: number
}

export interface ICreative {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	creator: string
	price: number
	proposals: Array<string>
	type: ICreativeType
	geo: string
	unavailableGeo: Array<string>
	slot: string
	preview: string
	watermark: boolean
	video: string
	description: string
	approach: string
	ratio: IRatio
	resize: boolean
	resizePrices: ResizePrices | null
	changes: ICreative | null
	status: 'moderation' | 'approved'
	reskin: boolean
	reskinPrice: number
	expand?: {
		creator?: IUser
		proposals?: Array<IProjectProposal>
		geo?: IGeo
		unavailableGeo?: Array<IGeo>
		slot?: ISlot
		preview?: IFile
		video?: IFile,
		approach?: IApproach
	}
}

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
	expand?: {
		creative?: ICreative
		geo?: Array<IGeo>
	}
}

export const emptyCreative: ICreative = {
	collectionId: '',
	collectionName: '',
	created: '',
	updated: '',
	creator: '',
	id: '',
	price: 0,
	proposals: [],
	type: 'video',
	geo: '',
	unavailableGeo: [],
	slot: '',
	preview: '',
	watermark: false,
	video: '',
	description: '',
	approach: '',
	ratio: '1:1',
	resize: false,
	resizePrices: {
		'1:1': 0,
		'2:3': 0,
		'3:2': 0,
		'3:4': 0,
		'4:3': 0,
		'4:5': 0,
		'9:16': 0,
		'16:9': 0
	},
	changes: null,
	status: 'moderation',
	reskin: false,
	reskinPrice: 0
}

export interface ICreatives {
	items: Array<ICreative>
	page: number
	perPage: number
	totalItems: number
	totalPages: number
}