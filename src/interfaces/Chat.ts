import { IMessage } from '@/interfaces/Message.ts'
import type { DBRecord } from '@/interfaces/DBBase.ts'

export type IChat = DBRecord & {
	id: string
	created: string
	updated: string
	messages: Array<string>,
	expand?: {
		messages?: Array<IMessage>
	}
}
