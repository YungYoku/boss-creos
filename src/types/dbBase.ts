export interface DBRecord {
	collectionId: string
	collectionName: string
}

export interface DBRecordItems {
	page: number
	perPage: number
	totalItems: number
	totalPages: number
}