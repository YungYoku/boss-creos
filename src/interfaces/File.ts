import type { DBRecord } from '@/interfaces/DBBase.ts'

export type IFile = DBRecord & {
	id: string
	created: string
	updated: string
	file: string
}

export type IImage = DBRecord & {
	id: string
	created: string
	updated: string
	original_image: string
	watermarked_image: string
}

export type IVideo = DBRecord & {
	id: string
	created: string
	updated: string
	original_video: string
	watermarked_video: string
}