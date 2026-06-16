<template>
	<component :is="layout">
		<router-view />
	</component>

	<Toast />
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import { DefaultLayout, AuthLayout } from '@/components/layouts'
import { Toast } from '@/components/blocks'
import { useAuthStore } from '@/stores/auth'
import { Http, Storage } from '@/plugins'
import type { IUserRefresh } from '@/types/user'

const auth = useAuthStore()
const router = useRouter()

const layouts = {
	default: DefaultLayout,
	auth: AuthLayout
}

const layout = computed(() => {
	const name = router.currentRoute.value.meta.layout as keyof typeof layouts | undefined
	return layouts[name ?? 'default']
})

const loadUserInfo = async () => {
	if (auth.isLoggedIn) {
		await Http.post<IUserRefresh>(
			'/collections/users/auth-refresh',
			{},
			{
				expand: [
					'avatar',
					'baskets',
					'baskets.video',
					'baskets.creative',
					'baskets.creative.preview',
					'baskets.creative.slot',
					'baskets.geo',
					'transactions'
				]
			}
		)
			.then(({ token, record }) => {
				auth.setToken(token)
				auth.setUser(record)
			})
			.catch(async () => {
				Storage.clear()
				auth.$reset()
				await router.push('/login')
			})
	}
}
watch(() => auth.isLoggedIn, loadUserInfo, { immediate: true })
</script>