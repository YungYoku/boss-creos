import type { IUser } from '@/types/user.ts'
import type { DBRecord } from '@/types/dbBase.ts'

export type IReferralCode = DBRecord & {
	created: Date,
	id: string,
	updated: Date
	used: Array<IUser>
	new: Array<IUser>
}