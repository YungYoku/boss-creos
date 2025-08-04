import type { DBRecord } from '@/types/DBBase.ts'

export type IApproach = DBRecord & {
	id: string
	created: string
	updated: string
	name: string
}