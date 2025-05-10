<template>
	<header class="header">
		<Grid
			:columns-xl="[1, 2, 1]"
			:columns-s="[1, 1]"
		>
			<Logo class="header__logo"/>

			<div/>

			<nav class="header__nav">
				<template v-if="!auth.isLoggedIn">
					<router-link
						v-for="link in authLinks"
						:key="link.text"
						:to="link.to"
					>
						{{ link.text }}
					</router-link>
				</template>

				<Button
					v-if="auth.isCustomer"
					variant="positive"
					to="/new-project"
				>
					<Icon
						name="plus"
						:colors="['light', 'light']"
					/>
				</Button>

				<Notifications v-if="auth.isLoggedIn"/>

				<UserDropdown v-if="auth.isLoggedIn"/>
			</nav>
		</Grid>
	</header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.ts'

import { Grid } from '@/components/structures'
import { UserDropdown, Notifications, Button } from '@/components/blocks'
import { Logo, Icon } from '@/components/elements'

const auth = useAuthStore()

const authLinks = [
	{
		text: 'Авторизация',
		to: '/login',
	}
]
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    min-height: 48px;
	padding: 5px 0;

	&__nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		gap: 10px;

		margin: 0 0 0 auto;
	}
}
</style>