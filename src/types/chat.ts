import type { IMessage } from '@/types/message.ts'
import type { DBRecord } from '@/types/dbBase.ts'

export type IChat = DBRecord & {
	id: string
	created: string
	updated: string
	messages: Array<string>,
	expand?: {
		messages?: Array<IMessage>
	}
}
