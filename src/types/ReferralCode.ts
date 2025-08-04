import { IUser } from '@/types/User.ts'
import type { DBRecord } from '@/types/DBBase.ts'

export type IReferralCode = DBRecord & {
	created: Date,
	id: string,
	updated: Date
	used: Array<IUser>
	new: Array<IUser>
}