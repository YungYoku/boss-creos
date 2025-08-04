import { IUser } from '@/interfaces/User.ts'
import type { DBRecord } from '@/interfaces/DBBase.ts'

export type IReferralCode = DBRecord & {
	created: Date,
	id: string,
	updated: Date
	used: Array<IUser>
	new: Array<IUser>
}