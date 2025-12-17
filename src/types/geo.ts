import type { DBRecord } from '@/types/dbBase'

export type IGeo = DBRecord & {
	id: string
	name: string
}