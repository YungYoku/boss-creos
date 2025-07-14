<template>
	<header class="header">
		<Grid
			:columns-xl="['300px', 2, 1]"
			:columns-s="['300px', 1]"
		>
			<Logo class="header__logo"/>

			<nav class="header__nav">
				<template
					v-for="item in nav"
					:key="item.text"
				>
					<router-link
						v-if="item.can"
						class="header__nav-item"
						exact-active-class="_active"
						:to="item.to"
					>
						{{ item.text }}
					</router-link>
				</template>
			</nav>

			<nav class="header__account">
				<router-link
					v-if="!auth.isLoggedIn && !isAuthPage"
					to="/login"
				>
					Авторизация
				</router-link>

				<UserDropdown v-if="auth.isLoggedIn"/>
			</nav>
		</Grid>
	</header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

import { Grid } from '@/components/structures'
import { UserDropdown } from '@/components/blocks'
import { Logo } from '@/components/elements'

const auth = useAuthStore()

const nav = [
	{
		text: 'Главная',
		to: '/',
		can: true
	},
	{
		text: 'Магазин',
		to: '/shop',
		can: auth.isBuyer || auth.isGuest
	},
	{
		text: 'Дизайнеры',
		to: '/designers',
		can: auth.isBuyer || auth.isGuest
	},
	{
		text: 'Баланс',
		to: '/balance',
		can: auth.isBuyer || auth.isDesigner
	},
	/*
	{
		text: 'Биржа',
		to: '/',
	},
	{
		text: 'Реклама',
		to: '/',
	},
	{
		text: 'Контакты',
		to: '/',
	},
	*/
]

const route = useRoute()
const isAuthPage = computed(() => route.name === 'Login' || route.name === 'Registration')
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    min-height: 48px;
	margin: 0 auto;
	padding: 5px 0;

	&__nav {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		gap: 10px;
	}
	
	&__nav-item {
		&._active {
			border-bottom: 1px solid #ffffff;
		}
	}

	&__account {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		gap: 10px;

		margin: 0 0 0 auto;
	}

	&__shopping-cart {
		display: flex;
		align-items: center;
	}
}
</style>