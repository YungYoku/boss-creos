import { IMessage } from '@/types/Message.ts'
import type { DBRecord } from '@/types/DBBase.ts'

export type IChat = DBRecord & {
	id: string
	created: string
	updated: string
	messages: Array<string>,
	expand?: {
		messages?: Array<IMessage>
	}
}
