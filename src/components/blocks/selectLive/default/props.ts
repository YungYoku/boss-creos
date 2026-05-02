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
	typeKey?: string
	label?: string
	api: string
	filterFields?: string[]
	exclude?: string[] | undefined
	multiple?: boolean
}

export const defaultProps = {
	error: null,
	typeKey: 'name',
	label: 'Значение',
	api: '',
	filterFields: () => ['id', 'name'],
	multiple: false
} as const