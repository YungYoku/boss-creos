import { IReferralCode } from '@/types/ReferralCode.ts'
import { IProject } from '@/types/Project.ts'
import { IRating } from '@/types/Rating.ts'
import { INotification } from '@/types/Notification.ts'
import { IBasket } from '@/types/Basket.ts'
import { IImage } from '@/types/File.ts'
import type { DBRecord, DBRecordItems } from '@/types/DBBase.ts'
import { Transaction } from '@/types/Transaction.ts'

export type IUser = DBRecord & {
	avatar: string
	created: Date
	updated: Date
	email: string
	emailVisibility: boolean
	id: string
	description: string
	username: string
	verified: boolean
	role: 'admin' | 'buyer' | 'designer' | 'guest'
	energy: number
	referral_code: string
	favorite: Array<string>
	rating: Array<string>
	notifications: Array<string>
	baskets: Array<string>
	telegram: string
	balance: number
	transactions: Array<string>
	status: 'approved' | 'moderation'
	changes: Partial<Omit<IUser, 'changes' | 'expand'>> | null
	expand?: {
		avatar?: IImage
		referral_code?: IReferralCode
		favorite?: Array<IProject>
		rating?: Array<IRating>
		notifications?: Array<INotification>
		baskets?: Array<IBasket>
		transactions?: Array<Transaction>
	}
}

export type IUserRefresh = {
	token: string
	record: IUser
}

export const emptyUser: IUser = {
	avatar: '',
	collectionId: '',
	collectionName: '',
	email: '',
	created: new Date(),
	updated: new Date(),
	emailVisibility: false,
	id: '',
	description: '',
	rating: [],
	username: '',
	verified: false,
	role: 'guest',
	energy: 0,
	favorite: [],
	referral_code: '',
	notifications: [],
	baskets: [],
	telegram: '',
	balance: 0,
	transactions: [],
	status: 'moderation',
	changes: null
}

export type IUsers = DBRecordItems & {
	items: Array<IUser>
}

export type IUserLogin = {
	record: IUser
	token: string
}
