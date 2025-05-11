import { IFile } from '@/interfaces/File.ts'

export interface IMessage {
	id: string
	collectionId: string
	collectionName: string
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