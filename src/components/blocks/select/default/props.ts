export type Item = {
	id: string
	name: string
}

export type Props = {
	error?: string | null
	label?: string
	items: Array<Item>
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
} as const