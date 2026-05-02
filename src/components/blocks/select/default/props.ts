export interface Item {
	id: string
	name: string
}

export interface Props {
	error?: string | null
	label?: string
	items: Item[]
	multiple?: boolean
	clearable?: boolean
	searchable?: boolean
}

export const defaultProps = {
	error: null,
	label: '',
	items: () => [],
	multiple: false,
	clearable: true,
	searchable: false
}