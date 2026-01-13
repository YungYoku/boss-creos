export type Item = {
	id: string
	name: string
	[key: string]: unknown
}

export type Items = {
	page: number,
	perPage: number,
	totalPages: number,
	totalItems: number,
	items: Array<Item>
}

export type Props = {
	modelValue: Array<string> | string
	error?: string | null
	typeKey?: string
	label?: string
	api: string
	filterFields?: Array<string>
	exclude?: Array<string> | undefined
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