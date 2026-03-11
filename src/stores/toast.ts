import { defineStore } from 'pinia'

export interface State {
	text: string
	removingTimeout: ReturnType<typeof setTimeout> | null
}

export const useToast = defineStore('toast', {
	state: (): State =>
		({
			text: '',
			removingTimeout: null
		}) as State,

	getters: {
		showed: ({ text }) => text.length > 0
	},

	actions: {
		set(text: string) {
			this.text = text

			this.removingTimeout = setTimeout(() => {
				this.text = ''
				this.removingTimeout = null
			}, 5000)
		},

		close() {
			this.text = ''
			if (this.removingTimeout) {
				clearTimeout(this.removingTimeout)
			}
		}
	}
})