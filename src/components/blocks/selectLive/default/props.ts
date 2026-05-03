export interface Item {
	id: string
	name: string
	[key: string]: unknown
}

export interface Items {
	page: number
	perPage: number
	totalPages: number
	totalItems: number
	items: Item[]
}

export interface Props {
	error?: string | null
	label?: string
	api: string
	filterFields?: string[]
	exclude?: string[] | undefined
	multiple?: boolean
}