import type { IFile } from '@/types/file.ts'
import type { DBRecord } from '@/types/dbBase.ts'

export type IMessage = DBRecord & {
	id: string
	created: string
	updated: string
	text: string
	file: string | null
	user: string
	checked: boolean
	expand?:{
		file?: IFile
	}
}