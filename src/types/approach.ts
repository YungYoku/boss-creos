import type { DBRecord } from '@/types/dbBase'

export type IApproach = DBRecord & {
	id: string
	created: string
	updated: string
	name: string
}