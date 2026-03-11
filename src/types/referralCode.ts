import type { IUser } from '@/types/user'
import type { DBRecord } from '@/types/dbBase'

export type IReferralCode = DBRecord & {
	created: Date
	id: string
	updated: Date
	used: IUser[]
	new: IUser[]
}