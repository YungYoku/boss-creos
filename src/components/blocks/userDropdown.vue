<template>
	<Dropdown :items>
		<Avatar self/>
	</Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/stores/toast'

import { Dropdown } from '@/components/structures'
import { Avatar } from '@/components/blocks'
import { useAuthStore } from '@/stores/auth.ts'
import { Http, Storage } from '@/plugins'
import { IReferralCode } from '@/interfaces/ReferralCode.ts'
import { IUser } from '@/interfaces/User.ts'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const generateRefCode = async () => {
	let referral_code = ''
	await Http
		.post<IReferralCode>('/collections/referral_codes/records')
		.then((res) => {
			referral_code = res.id
		})

	await Http
		.patch<IUser>(`/collections/users/records/${auth.user.id}`, {
			referral_code
		})
		.then((res) => {
			auth.setUser(res)
		})
}

const copyRefLink = async () => {
	if (auth.user.referral_code?.length === 0) {
		await generateRefCode()
	}

	await navigator.clipboard.writeText(`${window.location.origin}/registration?ref=${auth.user.referral_code}`)
	toast.set('Ссылка скопирована!')
}

const logout = () => {
	Storage.clear()
	auth.$reset()
	router.push('/login')
}

const items = computed(() => [
	[
		{
			text: 'Профиль',
			to: `/users/${auth.user.id}`
		},
		{
			text: 'Настройки',
			to: '/profile'
		},
	],
	[
		{
			text: 'Мои объявления',
			to: '/made-projects',
			can: auth.isCustomer
		},
		{
			text: 'Создать объявление',
			to: '/new-project',
			can: auth.isCustomer
		},
		{
			text: 'Создать креатив',
			to: '/new-creative',
			can: auth.isCustomer
		},
		{
			text: 'Выполняемые объявления',
			to: '/executing-projects',
			can: auth.isExecutor
		},
		{
			text: 'Мои чаты',
			to: '/chats'
		},
		{
			text: 'Избранное',
			to: '/favorite',
			can: auth.isExecutor
		}
	],
	[
		{
			text: 'Пригласить друзей',
			action: copyRefLink
		}
	],
	[
		{
			text: 'Выйти',
			action: logout
		}
	]
])
</script>
