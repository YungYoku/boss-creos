<template>
	<Skeleton
		v-if="loading"
		width="120px"
		height="28px"
	/>

	<component
		:is="(link && user.id) ? 'router-link' : 'div'"
		v-else
		class="user"
		:class="{
			'_link': (link && user.id),
		}"
		:to="`/users/${user.id}`"
	>
		<Avatar
			size="m"
			:user="user"
		/>

		<div class="user__info">
			<div class="user__name">
				{{ user.username }}
			</div>

			<div class="user__bought-amount">
				Кол-во продаж: {{ boughtAmount }}
			</div>
		</div>
	</component>
</template>


<script setup lang="ts">
import { type IUser } from '@/types/user'
import { Skeleton } from '@/components/elements'
import Avatar from '../avatar/avatar.vue'

interface Props {
	user: IUser,
	loading?: boolean
	link?: boolean
	boughtAmount?: number
}

withDefaults(defineProps<Props>(), {
	loading: false,
	link: false,
	boughtAmount: 0
})
</script>

<style scoped>
.user {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;

	.user__info {
		display: flex;
		flex-direction: column;
		line-height: 1.5;
	}

	.user__name {
		font-size: 14px;
		color: #E5E5E7;
	}

	.user__bought-amount {
		font-size: 11px;
		color: #AFAFB7;
	}

	&._link {
		cursor: pointer;
	}
}
</style>
