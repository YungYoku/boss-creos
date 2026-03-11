import type { IMessage } from '@/types/message'
import type { DBRecord } from '@/types/dbBase'

export type IChat = DBRecord & {
	id: string
	created: string
	updated: string
	messages: string[]
	expand?: {
		messages?: IMessage[]
	}
}