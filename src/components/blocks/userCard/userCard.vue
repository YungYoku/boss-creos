<template>
	<Island class="user-card">
		<Grid
			:columns="1"
			vertical
		>
			<User
				showing-surname
				:user
				:loading
				:link
			/>

			<Skeleton
				v-if="loading"
				width="120px"
				height="20px"
			/>
		</Grid>
	</Island>
</template>

<script setup lang="ts">
import { Grid, Island } from '@/components/structures'
import { User } from '@/components/blocks'
import { Skeleton } from '@/components/elements'
import { emptyUser, IUser } from '@/interfaces/User.ts'

interface Props {
	user: IUser,
	loading?: boolean
	link?: boolean
}

withDefaults(defineProps<Props>(), {
	user: () => ({ ...emptyUser }),
	loading: false,
	link: false
})
</script>

<style lang="scss" scoped>
.user-card {
	position: relative;

	padding: 16px 8px;

	background: #0F0F10;
	border: 1px solid #1D1D20;
	border-radius: 16px;

	&__info {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
}
</style>
