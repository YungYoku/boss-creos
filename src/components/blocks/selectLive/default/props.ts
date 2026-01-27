export interface Item {
	id: string
	name: string
	[key: string]: unknown
}

export interface Items {
	page: number,
	perPage: number,
	totalPages: number,
	totalItems: number,
	items: Item[]
}

export interface Props {
	modelValue: string[] | string
	error?: string | null
	typeKey?: string
	label?: string
	api: string
	filterFields?: string[]
	exclude?: string[] | undefined
	multiple?: boolean
}

export const defaultProps = {
	modelValue: () => ([]),
	error: null,
	typeKey: 'name',
	label: 'Значение',
	api: '',
	filterFields: () => (['id', 'name']),
	filter: [],
	multiple: false
}