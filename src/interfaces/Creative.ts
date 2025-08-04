import { IUser } from '@/interfaces/User.ts'
import { IProjectProposal } from '@/interfaces/Project.ts'
import { IImage, IVideo } from '@/interfaces/File.ts'
import { IGeo } from '@/interfaces/Geo.ts'
import { ISlot } from '@/interfaces/Slot.ts'
import { IApproach } from '@/interfaces/Approach.ts'
import type { DBRecord, DBRecordItems } from '@/interfaces/DBBase.ts'

export type ICreativeType = 'video' | 'static' | 'pwa'
const _creativeTypeItems: Array<ICreativeType> = ['video', 'static', 'pwa']
export const creativeTypeItems = _creativeTypeItems.map(item => ({
	id: item,
	name: item
}))

export type IRatio = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '4:5' | '9:16' | '16:9'
const _ratioItems: Array<IRatio> = ['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '9:16', '16:9']
export const ratioItems = _ratioItems.map(item => ({
	id: item,
	name: item
}))

export type ResizePrices = {
	[_ in IRatio]: number
}

export type ICreative = DBRecord & {
	id: string
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
	changes: Partial<Omit<ICreative, 'changes' | 'expand'>> | null
	status: 'moderation' | 'approved'
	reskin: boolean
	reskinPrice: number
	expand?: {
		creator?: IUser
		proposals?: Array<IProjectProposal>
		geo?: IGeo
		unavailableGeo?: Array<IGeo>
		slot?: ISlot
		preview?: IImage
		video?: IVideo,
		approach?: IApproach
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
	reskinPrice: 0,
	expand: {}
}

export type ICreatives = DBRecordItems & {
	items: Array<ICreative>
}