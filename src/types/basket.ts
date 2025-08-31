import type { ICreative, IRatio } from '@/types/creative.ts'
import type { IGeo } from '@/types/geo.ts'
import type { DBRecord, DBRecordItems } from '@/types/dbBase.ts'
import type { IVideo } from '@/types/file.ts'

export type BasketStatus = 'created' | 'in-progress' | 'done'

export type IBasket = DBRecord & {
	id: string
	created: string
	updated: string
	creative: string
	geo: Array<string>
	resize: Array<IRatio>
	reskin: boolean
	comment: string
	status: BasketStatus
	video: string
	expand?: {
		creative?: ICreative
		geo?: Array<IGeo>
		video?: IVideo,
	}
}

export type IBaskets = DBRecordItems & {
	items: Array<IBasket>
}