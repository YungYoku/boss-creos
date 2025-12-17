import type { DBRecord } from '@/types/dbBase'

export type TransactionType = 'deposit' | 'withdraw'
export type TransactionStatus = 'pending' | 'done'

export type Transaction = DBRecord & {
	created: Date
	updated: Date
	id: string
	amount: number
	type: TransactionType
	status: TransactionStatus
	blockchain?: 'btc' | 'eth'
	address?: string
}
