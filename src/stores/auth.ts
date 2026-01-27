import { defineStore } from 'pinia'
import { emptyUser, type IUser } from '@/types/user'
import Storage from '@/plugins/storage'
import type { IBasket } from '@/types/basket'

export interface State {
	user: IUser
	token: string
}

export const useAuthStore = defineStore('auth', {
	state: (): State => <State>({
		user: {
			...emptyUser,
			...(Storage.load('user') ?? {}),
		},

		token: Storage.load('token') ?? '',
	}),

	getters: {
		isGuest: state => state.token.length === 0,
		isLoggedIn: state => state.token.length > 0,
		isBuyer: state => state.user.role === 'buyer',
		isDesigner: state => state.user.role === 'designer',
		isAdmin: state => state.user.role === 'admin',
		isPersonalInfoIncomplete: state => {
			const { username } = state.user
			const rules = [
				username.length > 0,
			]

			for (const rule of rules) {
				if (!rule) return true
			}

			return false
		}
	},

	actions: {
		setToken(token: string) {
			this.token = token
			Storage.write('token', token)
		},

		setUser(user: IUser) {
			this.user = {
				...this.user,
				...user
			}
			Storage.write('user', {
				role: user.role
			})
		},

		setBaskets(baskets: Array<IBasket>) {
			this.user.baskets = baskets.map(item => item.id)
			if (this.user.expand) {
				this.user.expand.baskets = baskets
			}
		},

		setEnergy(energy: number) {
			this.user.energy = energy
		}
	},
})