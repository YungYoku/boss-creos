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
import { useAuthStore } from '@/stores/auth'
import { Storage } from '@/plugins'
// import { IReferralCode } from '@/interfaces/ReferralCode'
// import { IUser } from '@/interfaces/User'

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

const logout = async () => {
	Storage.clear()
	auth.$reset()
	await router.push('/login')
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
			text: 'Мои заказы',
			to: '/bought',
			can: auth.isBuyer
		},
		{
			text: 'Избранное',
			to: '/favorite',
			can: auth.isBuyer
		},
		{
			text: 'Корзина',
			to: '/shopping-cart',
			can: auth.isBuyer
		},

		{
			text: 'Мои креативы',
			to: '/made-creatives',
			can: auth.isDesigner
		},
		{
			text: 'Мои заказы',
			to: '/orders',
			can: auth.isDesigner
		},
		{
			text: 'Создать креатив',
			to: '/creative/new',
			can: auth.isDesigner
		},

		{
			text: 'На модерации',
			to: '/moderation',
			can: auth.isAdmin
		},

		// {
		// 	text: 'Выполняемые объявления',
		// 	to: '/executing-projects',
		// 	can: auth.isDesigner
		// },
		// {
		// 	text: 'Избранное',
		// 	to: '/favorite',
		// 	can: auth.isDesigner
		// }
	],
	[
		{
			text: 'Выйти',
			action: logout
		}
	]
])
</script>

<style scoped>
@keyframes rotate-glow {
	0% {
		transform: rotate(-90deg);
	}

	100% {
		transform: rotate(270deg);
	}
}

.user-dropdown {
	.user-dropdown__account {
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 8px 22px;
		overflow: hidden;
		font-size: 14px;
		line-height: 24px;
		font-weight: 500;
		border: 1px solid rgb(255 255 255 / 10%);
		border-radius: 50px;
		outline: none;
		box-shadow: 0 0 10px rgb(0 0 0 / 50%);
		cursor: pointer;

		&::before {
			content: '';
			position: absolute;
			inset: -100%;
			z-index: -1;
			background: conic-gradient(
				transparent 0%,
				transparent 20%,
				rgb(255 255 255 / 35%) 50%,
				rgb(255 255 255 / 10%) 20%,
				transparent 50%,
				transparent 100%
			);
			background-size: 100% 100%;
			border-radius: 50%;
			opacity: 0.8;
			animation: rotate-glow 2s linear infinite;
			pointer-events: none;
		}

		&::after {
			content: '';
			position: absolute;
			inset: 1px;
			z-index: -1;
			background-color: #090909;
			border-radius: 50px;
			box-shadow: inset 0 0 4px rgb(255 255 255 / 5%),
			inset 0 0 20px rgb(255 255 255 / 2%);
			pointer-events: none;
		}
	}
}
</style>