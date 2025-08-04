import type { DBRecord } from '@/types/DBBase.ts'

export type ISlot = DBRecord & {
	id: string
	created: string
	updated: string
	name: string
}
