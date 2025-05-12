<template>
	<header class="header">
		<Grid
			:columns-xl="['300px', 2, 1]"
			:columns-s="['300px', 1]"
		>
			<Logo class="header__logo"/>

			<nav class="header__nav">
				<router-link to="/">
					Главная
				</router-link>
				<router-link to="/">
					Магазин
				</router-link>
				<router-link to="/">
					Биржа
				</router-link>
				<router-link to="/">
					Реклама
				</router-link>
				<router-link to="/">
					Контакты
				</router-link>
			</nav>

			<nav class="header__account">
				<router-link
					v-if="!auth.isLoggedIn"
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
import { useAuthStore } from '@/stores/auth.ts'

import { Grid } from '@/components/structures'
import { UserDropdown } from '@/components/blocks'
import { Logo } from '@/components/elements'

const auth = useAuthStore()
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    min-height: 48px;
	padding: 5px 0;

	&__nav {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		gap: 10px;
	}

	&__account {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		gap: 10px;

		margin: 0 0 0 auto;
	}
}
</style>