export interface Props {
	error?: string | null
	loading?: boolean
	label?: string
	disabled?: boolean
	type?: 'text' | 'password' | 'email' | 'file' | 'number'
	icon?: string | null
	autocomplete?: 'off' | 'on' | 'new-password' | 'username'
	cursor?: 'text' | 'pointer'
	clearable?: boolean
	variant?: 'default' | 'plain'
	transparent?: boolean
	accept?: string
}

export const defaultProps = {
	error: null,
	loading: false,
	label: '',
	disabled: false,
	type: 'text',
	icon: null,
	autocomplete: 'off',
	cursor: 'text',
	clearable: true,
	variant: 'default',
	transparent: false,
	accept: '',
} as const