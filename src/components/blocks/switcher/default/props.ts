export type Props = {
	error?: string | null,
	checked?: boolean,
	disabled?: boolean
	label?: string
}

export const defaultProps = {
	error: null,
	checked: false,
	disabled: false,
	label: ''
} as const
