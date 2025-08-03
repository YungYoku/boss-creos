import { IReferralCode } from '@/interfaces/ReferralCode.ts'
import { IProject } from '@/interfaces/Project.ts'
import { IRating } from '@/interfaces/Rating.ts'
import { INotification } from '@/interfaces/Notification.ts'
import { IBasket } from '@/interfaces/Creative.ts'
import { IImage } from '@/interfaces/File.ts'

export type TransactionType = 'deposit' | 'withdraw'

export interface Transaction {
	collectionId: string
	collectionName: string
	created: Date
	updated: Date
	id: string
	amount: number
	type: TransactionType
	status: 'pending' | 'done'
}

export interface IUser {
	avatar: string
	collectionId: string
	collectionName: string
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

export interface IUsers {
	page: number,
	perPage: number,
	totalPages: number,
	totalItems: number,
	items: Array<IUser>
}

export interface IUserLogin {
	record: IUser
	token: string
}
