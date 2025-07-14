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
				component: () => import('@/views/main/main.vue'),
				meta: {
					rules: [],
					bgClass: 'main'
				},
			},
			// {
			// 	path: '/new-project',
			// 	name: 'NewProject',
			// 	component: () => import('@/views/newProject/newProject.vue'),
			// 	meta: {
			// 		rules: ['auth', 'buyer']
			// 	}
			// },
			// {
			// 	path: '/project/:id',
			// 	name: 'Project',
			// 	component: () => import('@/views/project/project.vue'),
			// 	meta: {
			// 		rules: []
			// 	}
			// },
			// {
			// 	path: '/project/:id/edit',
			// 	name: 'ProjectEditing',
			// 	component: () => import('@/views/editProject/editProject.vue'),
			// 	meta: {
			// 		rules: []
			// 	}
			// },
			{
				path: '/new-creative',
				name: 'NewCreative',
				component: () => import('@/views/newCreative/newCreative.vue'),
				meta: {
					rules: ['auth', 'designer'],
					bgClass: 'new-creative'
				}
			},
			{
				path: '/creative/:id',
				name: 'Creative',
				component: () => import('@/views/creative/creative.vue'),
				meta: {
					rules: []
				}
			},
			{
				path: '/creative/:id/edit',
				name: 'EditCreative',
				component: () => import('@/views/editCreative/editCreative.vue'),
				meta: {
					rules: []
				}
			},
			// {
			// 	path: '/made-projects',
			// 	name: 'MadeProjects',
			// 	component: () => import('@/views/madeProjects/madeProjects.vue'),
			// 	meta: {
			// 		rules: ['auth', 'buyer']
			// 	}
			// },
			{
				path: '/made-creatives',
				name: 'MadeCreatives',
				component: () => import('@/views/madeCreatives/madeCreatives.vue'),
				meta: {
					rules: ['auth', 'designer']
				}
			},
			{
				path: '/executing-projects',
				name: 'ExecutingProjects',
				component: () => import('@/views/executingProjects/executingProjects.vue'),
				meta: {
					rules: ['auth', 'designer']
				}
			},
			{
				path: '/favorite',
				name: 'Favorite',
				component: () => import('@/views/favorite/favorite.vue'),
				meta: {
					rules: ['auth', 'designer']
				}
			},
			{
				path: '/shopping-cart',
				name: 'ShoppingCart',
				component: () => import('@/views/shoppingCart/shoppingCart.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/shopping-cart/edit',
				name: 'EditShoppingCart',
				component: () => import('@/views/editShoppingCart/editShoppingCart.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/bought',
				name: 'Bought',
				component: () => import('@/views/bought/bought.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/users/:id',
				name: 'User',
				component: () => import('@/views/user/user.vue'),
				meta: {
					rules: []
				}
			},
			{
				path: '/profile',
				name: 'Profile',
				component: () => import('@/views/profile/profile.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/balance',
				name: 'Balance',
				component: () => import('@/views/balance/balance.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/shop',
				name: 'Shop',
				component: () => import('@/views/shop/shop.vue'),
				meta: {
					rules: [],
					bgClass: 'shop'
				}
			},
			{
				path: '/designers',
				name: 'Designers',
				component: () => import('@/views/designers/designers.vue'),
				meta: {
					rules: [],
					bgClass: 'shop'
				}
			},
			{
				path: '/moderation',
				name: 'Moderation',
				component: () => import('@/views/moderation/moderation.vue'),
				meta: {
					rules: ['auth', 'admin'],
					bgClass: 'shop'
				}
			},
			// {
			// 	path: '/chats',
			// 	name: 'Chats',
			// 	component: () => import('@/views/chats/chats.vue'),
			// 	meta: {
			// 		rules: ['auth']
			// 	}
			// }
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/login.vue'),
		meta: {
			rules: ['no-auth'],
			bgClass: 'auth'
		}
	},
	{
		path: '/registration',
		name: 'Registration',
		component: () => import('@/views/registration/registration.vue'),
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
	const toRules = (to.meta.rules ?? []) as Array<string>


	const previousBgClass = (from.meta.bgClass ?? 'default') as string
	const currentBgClass = (to.meta.bgClass ?? 'default') as string
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
		if (toRules.includes('admin')) {
			if (authStore.isAdmin) return true
			return '/'
		}

		return true
	} else if (toRules.includes('no-auth')) {
		if (authStore.isLoggedIn) return '/'

		return true
	}
})

export default router
