export type Props = {
	error?: string | null
	label?: string
	height?: string
	disabled?: boolean
}

export const defaultProps = {
	error: null,
	label: '',
	height: '200px',
	disabled: false
} as const
