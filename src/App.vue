<template>
	<router-view/>
	<Toast/>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { Http, Storage } from '@/plugins'
import { IUserRefresh } from '@/interfaces/User'
import { Toast } from '@/components/blocks'
import { useColorMode } from '@vueuse/core'

const auth = useAuthStore()
const router = useRouter()

const loadUserInfo = async () => {
	if (auth.isLoggedIn) {
		Http
			.post<IUserRefresh>('/collections/users/auth-refresh', {
			}, {
				expand: ['baskets', 'baskets.creative', 'baskets.creative.preview', 'baskets.creative.slot', 'baskets.creative', 'baskets.geo']
			})
			.then(({ token, record }) => {
				auth.setToken(token)
				auth.setUser(record)
			})
			.catch(() => {
				Storage.clear()
				auth.$reset()
				router.push('/login')
			})
	}
}
watch(() => auth.isLoggedIn, loadUserInfo, { immediate: true })

const mode = useColorMode({ selector: 'body' })
const currentTheme = computed(() => mode.state.value)
if (currentTheme.value === 'light') {
	mode.value = 'dark'
}
</script>
