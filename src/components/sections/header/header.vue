<template>
	<header class="header">
		<Grid :columns-xl="['300px', 2, 1]" :columns-s="['300px', 1]">
			<Logo class="header__logo" />

			<nav class="header__nav">
				<template v-for="item in nav" :key="item.text">
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
				<router-link v-if="!auth.isLoggedIn && !isAuthPage" to="/login">
					Авторизация
				</router-link>

				<UserDropdown v-if="auth.isLoggedIn" />
			</nav>
		</Grid>
	</header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { Grid } from '@/components/structures'
import { UserDropdown } from '@/components/blocks'
import { Logo } from '@/components/elements'

const auth = useAuthStore()

const nav = [
	{
		text: 'Главная',
		to: '/',
		can: true,
	},
	{
		text: 'Магазин',
		to: '/shop',
		can: auth.isBuyer || auth.isGuest,
	},
	{
		text: 'Дизайнеры',
		to: '/designers',
		can: auth.isBuyer || auth.isGuest,
	},
	{
		text: 'Баланс',
		to: '/balance',
		can: auth.isBuyer || auth.isDesigner,
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
const isAuthPage = computed(() => route.name === '/login/' || route.name === '/registration/')
</script>

<style scoped>
.header {
	width: 100%;
	min-height: 48px;
	margin: 0 auto;
	padding: 5px 0;
	position: relative;
	z-index: 2;

	.header__nav {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 10px;
	}

	.header__nav-item {
		position: relative;

		&::after {
			content: '';
			width: 0;
			height: 2px;
			background: #fff;
			position: absolute;
			bottom: -2px;
			left: 50%;
			border-radius: 2px;
			transition: all 0.2s;
		}

		&:hover {
			&::after {
				width: 6px;
				left: calc(50% - 3px);
				transition: all 0.2s;
			}
		}

		&._active {
			&::after {
				width: 14px;
				left: calc(50% - 7px);
				transition: all 0.2s;
			}
		}
	}

	.header__account {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 10px;
		margin: 0 0 0 auto;
	}

	.header__shopping-cart {
		display: flex;
		align-items: center;
	}
}
</style>