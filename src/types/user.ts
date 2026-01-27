import type { IReferralCode } from '@/types/referralCode'
import type { IRating } from '@/types/rating'
import type { INotification } from '@/types/notification'
import type { IBasket } from '@/types/basket'
import type { IImage } from '@/types/file'
import type { DBRecord, DBRecordItems } from '@/types/dbBase'
import type { Transaction } from '@/types/transaction'
import type { ICreative } from '@/types/creative'

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
	favorite: string[]
	rating: string[]
	notifications: string[]
	baskets: string[]
	telegram: string
	balance: number
	transactions: string[]
	status: 'approved' | 'moderation'
	changes: Partial<Omit<IUser, 'changes' | 'expand'>> | null
	expand?: {
		avatar?: IImage
		referral_code?: IReferralCode
		favorite?: ICreative[]
		rating?: IRating[]
		notifications?: INotification[]
		baskets?: IBasket[]
		transactions?: Transaction[]
	}
}

export interface IUserRefresh {
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
	items: IUser[]
}

export interface IUserLogin {
	record: IUser
	token: string
}
