import type { DBRecord } from '@/types/DBBase.ts'

export type TransactionType = 'deposit' | 'withdraw'

export type Transaction = DBRecord & {
	created: Date
	updated: Date
	id: string
	amount: number
	type: TransactionType
	status: 'pending' | 'done'
}
