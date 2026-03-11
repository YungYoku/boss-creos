import type { DBRecord, DBRecordItems } from '@/types/dbBase'

export type INotification = DBRecord & {
	created: string
	id: string
	text: string
	link: string
	updated: string
	checked: boolean
}

export type INotifications = DBRecordItems & {
	items: INotification[]
}