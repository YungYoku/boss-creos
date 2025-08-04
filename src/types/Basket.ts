import { ICreative, IRatio } from '@/types/Creative.ts'
import { IGeo } from '@/types/Geo.ts'
import type { DBRecord, DBRecordItems } from '@/types/DBBase.ts'

export type IBasket = DBRecord & {
	id: string
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

export type IBaskets = DBRecordItems & {
	items: Array<IBasket>
}