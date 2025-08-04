import type { DBRecord } from '@/types/DBBase.ts'

export type IGeo = DBRecord & {
	id: string
	name: string
}