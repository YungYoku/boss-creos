import type { DBRecord } from '@/types/dbBase'

export type ISlot = DBRecord & {
	id: string
	created: string
	updated: string
	name: string
}