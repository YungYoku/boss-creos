import type { DBRecord } from '@/types/dbBase.ts'

export type TransactionType = 'deposit' | 'withdraw'

export type Transaction = DBRecord & {
	created: Date
	updated: Date
	id: string
	amount: number
	type: TransactionType
	status: 'pending' | 'done'
}
