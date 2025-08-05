import type { DBRecord } from '@/types/dbBase.ts'

export type IApproach = DBRecord & {
	id: string
	created: string
	updated: string
	name: string
}