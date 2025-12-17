<template>
	<router-view/>
	<Toast/>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { Http, Storage } from '@/plugins'
import type { IUserRefresh } from '@/types/user.ts'
import { Toast } from '@/components/blocks'

const auth = useAuthStore()
const router = useRouter()

const loadUserInfo = async () => {
	if (auth.isLoggedIn) {
		await Http
			.post<IUserRefresh>('/collections/users/auth-refresh', {
			}, {
				expand: ['avatar', 'baskets', 'baskets.video', 'baskets.creative', 'baskets.creative.preview', 'baskets.creative.slot', 'baskets.geo', 'transactions']
			})
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
