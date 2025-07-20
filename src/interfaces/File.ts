export interface IFile {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	file: string
}

export interface IImage {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	original_image: string
	watermarked_image: string
}

export interface IVideo {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	original_video: string
	watermarked_video: string
}