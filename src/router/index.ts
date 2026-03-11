import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

import { useAuthStore } from '@/stores/auth'
import { AUTH, BUYER, NO_AUTH, DESIGNER, ADMIN } from '@/data/permissions'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

if (import.meta.hot) {
	handleHotUpdate(router)
}

const body = document.querySelector('body')

router.beforeEach((to, from) => {
	const authStore = useAuthStore()
	const toPermissions = (to.meta.permissions ?? []) as string[]

	const previousBgClass = (from.meta.bgClass ?? 'default') as string
	const currentBgClass = (to.meta.bgClass ?? 'default') as string
	body?.classList.remove(previousBgClass + '-bg')
	body?.classList.add(currentBgClass + '-bg')

	if (toPermissions.length === 0) {
		return true
	}
	if (toPermissions.includes(AUTH)) {
		if (!authStore.isLoggedIn) return '/login'

		if (toPermissions.includes(BUYER)) {
			if (authStore.isBuyer) return true
			return '/'
		}
		if (toPermissions.includes(DESIGNER)) {
			if (authStore.isDesigner) return true
			return '/'
		}
		if (toPermissions.includes(ADMIN)) {
			if (authStore.isAdmin) return true
			return '/'
		}

		return true
	} else if (toPermissions.includes(NO_AUTH)) {
		if (authStore.isLoggedIn) return '/'

		return true
	}

	return false
})

export default router