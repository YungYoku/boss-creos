import type { ICreative, IRatio } from '@/types/creative'
import type { IGeo } from '@/types/geo'
import type { DBRecord, DBRecordItems } from '@/types/dbBase'
import type { IVideo } from '@/types/file'

export type BasketStatus = 'created' | 'in-progress' | 'done'

export type IBasket = DBRecord & {
	id: string
	created: string
	updated: string
	creative: string
	geo: string[]
	resize: IRatio[]
	reskin: boolean
	comment: string
	status: BasketStatus
	video: string
	expand?: {
		creative?: ICreative
		geo?: IGeo[]
		video?: IVideo
	}
}

export type IBaskets = DBRecordItems & {
	items: IBasket[]
}