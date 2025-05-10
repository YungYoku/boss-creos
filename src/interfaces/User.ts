import { IReferralCode } from '@/interfaces/ReferralCode.ts'
import { IProject } from '@/interfaces/Project.ts'
import { IRating } from '@/interfaces/Rating.ts'
import { INotification } from '@/interfaces/Notification.ts'

export interface IUser {
    avatar: string
    collectionId: string
    collectionName: string
    created: Date
    updated: Date
    checked_at: Date
    email: string
    emailVisibility: boolean
    id: string
    name: string
    description: string
    surname: string
    username: string
    verified: boolean
    role: 'admin' | 'customer' | 'executor' | 'guest'
    energy: number
    referral_code: string
    favorite: Array<string>
    rating: Array<string>
	notifications: Array<string>
    expand?: {
        referral_code?: IReferralCode
        favorite?: Array<IProject>
        rating?: Array<IRating>
		notifications: Array<INotification>
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
	checked_at: new Date(),
	emailVisibility: false,
	id: '',
	name: '',
	description: '',
	surname: '',
	rating: [],
	username: '',
	verified: false,
	role: 'guest',
	energy: 0,
	favorite: [],
	referral_code: '',
	notifications: []
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
