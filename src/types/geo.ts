import type { DBRecord } from '@/types/dbBase.ts'

export type IGeo = DBRecord & {
	id: string
	name: string
}