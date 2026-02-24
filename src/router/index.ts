import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import { DefaultLayout, AuthLayout } from '@/components/layouts'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
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
				component: () => import('@/pages/main/index.vue'),
				meta: {
					rules: [],
					bgClass: 'main'
				},
			},
			// {
			// 	path: '/new-project',
			// 	name: 'NewProject',
			// 	component: () => import('@/views/newProject/index.vue'),
			// 	meta: {
			// 		rules: ['auth', 'buyer']
			// 	}
			// },
			// {
			// 	path: '/project/:id',
			// 	name: 'Project',
			// 	component: () => import('@/views/project/index.vue'),
			// 	meta: {
			// 		rules: []
			// 	}
			// },
			// {
			// 	path: '/project/:id/edit',
			// 	name: 'ProjectEditing',
			// 	component: () => import('@/views/editProject/index.vue'),
			// 	meta: {
			// 		rules: []
			// 	}
			// },
			{
				path: '/new-creative',
				name: 'NewCreative',
				component: () => import('@/pages/newCreative/index.vue'),
				meta: {
					rules: ['auth', 'designer'],
					bgClass: 'new-creative'
				}
			},
			{
				path: '/creative/:id',
				name: 'Creative',
				component: () => import('@/pages/creative/index.vue'),
				meta: {
					rules: []
				}
			},
			{
				path: '/creative/:id/edit',
				name: 'EditCreative',
				component: () => import('@/pages/editCreative/index.vue'),
				meta: {
					rules: []
				}
			},
			// {
			// 	path: '/made-projects',
			// 	name: 'MadeProjects',
			// 	component: () => import('@/views/madeProjects/index.vue'),
			// 	meta: {
			// 		rules: ['auth', 'buyer']
			// 	}
			// },
			{
				path: '/made-creatives',
				name: 'MadeCreatives',
				component: () => import('@/pages/madeCreatives/index.vue'),
				meta: {
					rules: ['auth', 'designer']
				}
			},
			{
				path: '/executing-projects',
				name: 'ExecutingProjects',
				component: () => import('@/pages/executingProjects/index.vue'),
				meta: {
					rules: ['auth', 'designer']
				}
			},
			{
				path: '/favorite',
				name: 'Favorite',
				component: () => import('@/pages/favorite/index.vue'),
				meta: {
					rules: ['auth', 'buyer']
				}
			},
			{
				path: '/shopping-cart',
				name: 'ShoppingCart',
				component: () => import('@/pages/shoppingCart/index.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/shopping-cart/edit/:id',
				name: 'EditShoppingCart',
				component: () => import('@/pages/editShoppingCart/index.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/bought',
				name: 'Bought',
				component: () => import('@/pages/bought/index.vue'),
				meta: {
					rules: ['auth'],
					bgClass: 'shop'
				}
			},
			{
				path: '/orders',
				name: 'Orders',
				component: () => import('@/pages/orders/index.vue'),
				meta: {
					rules: ['auth'],
					bgClass: 'shop'
				}
			},
			{
				path: '/users/:id',
				name: 'User',
				component: () => import('@/pages/user/index.vue'),
				meta: {
					rules: []
				}
			},
			{
				path: '/profile',
				name: 'Profile',
				component: () => import('@/pages/profile/index.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/balance',
				name: 'Balance',
				component: () => import('@/pages/balance/index.vue'),
				meta: {
					rules: ['auth'],
					bgClass: 'shop'
				}
			},
			{
				path: '/shop',
				name: 'Shop',
				component: () => import('@/pages/shop/index.vue'),
				meta: {
					rules: [],
					bgClass: 'shop'
				}
			},
			{
				path: '/designers',
				name: 'Designers',
				component: () => import('@/pages/designers/index.vue'),
				meta: {
					rules: [],
					bgClass: 'shop'
				}
			},
			{
				path: '/moderation',
				name: 'Moderation',
				component: () => import('@/pages/moderation/index.vue'),
				meta: {
					rules: ['auth', 'admin'],
					bgClass: 'shop'
				},
				children: [
					{
						path: 'creatives',
						name: 'ModerationCreatives',
						component: () => import('@/pages/moderation/creatives/index.vue'),
					},
					{
						path: 'users',
						name: 'ModerationUsers',
						component: () => import('@/pages/moderation/users/index.vue'),
					},
				],
			},
			// {
			// 	path: '/chats',
			// 	name: 'Chats',
			// 	component: () => import('@/views/chats/index.vue'),
			// 	meta: {
			// 		rules: ['auth']
			// 	}
			// }
		],
	},
	{
		path: '/',
		name: 'AuthLayout',
		component: AuthLayout,
		meta: {
			rules: []
		},
		children: [
			{
				path: '/login',
				name: 'Login',
				component: () => import('@/pages/login/index.vue'),
				meta: {
					rules: ['no-auth'],
					bgClass: 'auth'
				}
			},
			{
				path: '/registration',
				name: 'Registration',
				component: () => import('@/pages/registration/index.vue'),
				meta: {
					rules: ['no-auth'],
					bgClass: 'auth'
				}
			}
		]
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

const body = document.querySelector('body')

router.beforeEach((to, from) => {
	const authStore = useAuthStore()
	const toRules = (to.meta.rules ?? []) as string[]

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

	return false
})

export default router
