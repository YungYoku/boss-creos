import { IFile } from '@/types/File.ts'
import type { DBRecord } from '@/types/DBBase.ts'

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