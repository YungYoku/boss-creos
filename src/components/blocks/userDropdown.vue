<template>
	<Dropdown
		class="user-dropdown"
		:items
	>
		<div class="user-dropdown__account">
			Аккаунт
		</div>
	</Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
// import { useToast } from '@/stores/toast'
import { Dropdown } from '@/components/structures'
import { useAuthStore } from '@/stores/auth.ts'
import { Storage } from '@/plugins'
// import { IReferralCode } from '@/interfaces/ReferralCode.ts'
// import { IUser } from '@/interfaces/User.ts'

const auth = useAuthStore()
const router = useRouter()
// const toast = useToast()
//
// const generateRefCode = async () => {
// 	let referral_code = ''
// 	await Http
// 		.post<IReferralCode>('/collections/referral_codes/records')
// 		.then((res) => {
// 			referral_code = res.id
// 		})
//
// 	await Http
// 		.patch<IUser>(`/collections/users/records/${auth.user.id}`, {
// 			referral_code
// 		})
// 		.then((res) => {
// 			auth.setUser(res)
// 		})
// }

// const copyRefLink = async () => {
// 	if (auth.user.referral_code?.length === 0) {
// 		await generateRefCode()
// 	}
//
// 	await navigator.clipboard.writeText(`${window.location.origin}/registration?ref=${auth.user.referral_code}`)
// 	toast.set('Ссылка скопирована!')
// }

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
			text: 'Мои креативы',
			to: '/made-creatives',
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
			text: 'Избранное',
			to: '/favorite',
			can: auth.isExecutor
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

<style scoped lang="scss">
.user-dropdown {
	&__account {
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 8px 22px;

		font-size: 14px;
		line-height: 24px;
		font-weight: 700;

		border: 1px solid #ffffff;
		border-radius: 30px;
	}
}
</style>