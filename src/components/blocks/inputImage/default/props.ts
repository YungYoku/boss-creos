export interface Props {
	error?: string | null
	loading?: boolean
	compact?: boolean
	label?: string
	accept?: string
}

export const defaultProps = {
	error: null,
	loading: false,
	compact: false,
	label: '',
	accept: '',
} as const