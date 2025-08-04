import type { DBRecord } from '@/interfaces/DBBase.ts'

export type IGeo = DBRecord & {
	id: string
	name: string
}