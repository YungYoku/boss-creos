import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import { DefaultLayout } from '@/components/layouts'
import { useAuthStore } from '@/stores/auth.ts'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'DefaultLayout',
		component: DefaultLayout,
		meta: {
			rules: []
		},
		children: [
			{
				path: '/',
				name: 'Main',
				component: () => import('@/views/main.vue'),
				meta: {
					rules: [],
					bgClass: 'main'
				},
			},
			{
				path: '/new-project',
				name: 'NewProject',
				component: () => import('@/views/newProject.vue'),
				meta: {
					rules: ['auth', 'buyer']
				}
			},
			{
				path: '/project/:id',
				name: 'Project',
				component: () => import('@/views/project.vue'),
				meta: {
					rules: []
				}
			},
			{
				path: '/project/:id/edit',
				name: 'ProjectEditing',
				component: () => import('@/views/editProject.vue'),
				meta: {
					rules: []
				}
			},
			{
				path: '/new-creative',
				name: 'NewCreative',
				component: () => import('@/views/newCreative.vue'),
				meta: {
					rules: ['auth', 'designer'],
					bgClass: 'new-creative'
				}
			},
			{
				path: '/creative/:id',
				name: 'Creative',
				component: () => import('@/views/creative.vue'),
				meta: {
					rules: []
				}
			},
			{
				path: '/made-projects',
				name: 'MadeProjects',
				component: () => import('@/views/madeProjects.vue'),
				meta: {
					rules: ['auth', 'buyer']
				}
			},
			{
				path: '/made-creatives',
				name: 'MadeCreatives',
				component: () => import('@/views/madeCreatives.vue'),
				meta: {
					rules: ['auth', 'buyer']
				}
			},
			{
				path: '/executing-projects',
				name: 'ExecutingProjects',
				component: () => import('@/views/executingProjects.vue'),
				meta: {
					rules: ['auth', 'designer']
				}
			},
			{
				path: '/favorite',
				name: 'Favorite',
				component: () => import('@/views/favorite.vue'),
				meta: {
					rules: ['auth', 'designer']
				}
			},
			{
				path: '/shopping-cart',
				name: 'ShoppingCard',
				component: () => import('@/views/shoppingCart.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/shopping-cart/edit',
				name: 'EditShoppingCard',
				component: () => import('@/views/editShoppingCart.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/users/:id',
				name: 'User',
				component: () => import('@/views/user.vue'),
				meta: {
					rules: []
				}
			},
			{
				path: '/profile',
				name: 'Profile',
				component: () => import('@/views/profile.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/shop',
				name: 'Shop',
				component: () => import('@/views/shop.vue'),
				meta: {
					rules: [],
					bgClass: 'shop'
				}
			},
			{
				path: '/chats',
				name: 'Chats',
				component: () => import('@/views/chats.vue'),
				meta: {
					rules: ['auth']
				}
			}
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login.vue'),
		meta: {
			rules: ['no-auth'],
			bgClass: 'auth'
		}
	},
	{
		path: '/registration',
		name: 'Registration',
		component: () => import('@/views/registration.vue'),
		meta: {
			rules: ['no-auth'],
			bgClass: 'auth'
		}
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

const body = document.querySelector('body')

router.beforeEach((to, from) => {
	const authStore = useAuthStore()
	const toRules = to.meta.rules as Array<string> ?? []


	const previousBgClass = from.meta?.bgClass ?? 'default'
	const currentBgClass = to.meta?.bgClass ?? 'default'
	body?.classList.remove(previousBgClass + '-bg')
	body?.classList.add(currentBgClass + '-bg')

	if (toRules.length === 0) {
		return true
	}
	if (toRules.includes('auth')) {
		if (!authStore.isLoggedIn) return '/login'

		if (toRules.includes('buyer')) {
			if (authStore.isBuyer) return true
			return '/'
		}
		if (toRules.includes('designer')) {
			if (authStore.isDesigner) return true
			return '/'
		}

		return true
	} else if (toRules.includes('no-auth')) {
		if (authStore.isLoggedIn) return '/'

		return true
	}
})

export default router
