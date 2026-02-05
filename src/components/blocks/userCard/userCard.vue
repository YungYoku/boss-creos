<template>
	<Card class="user-card">
		<template #image>
			<Image
				v-if="user.expand?.avatar"
				class="user-card__image"
				:src="user.expand.avatar"
			/>
			<div
				v-else
				class="user-card__image"
			/>
		</template>

		<template #footer>
			<router-link :to="`/users/${user.id}`">
				{{ user.username }}
			</router-link>
		</template>
	</Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/structures'
import { Image } from '@/components/elements'
import { type IUser } from '@/types/user'

interface Props {
	user: IUser,
	loading?: boolean
	link?: boolean
}

withDefaults(defineProps<Props>(), {
	loading: false,
	link: false
})
</script>

<style lang="scss" scoped>
.user-card {
	&__image {
		width: 100%;
		max-width: 100%;
		border-radius: 10px;
		object-fit: cover;
		aspect-ratio: 1 / 1;
	}
}
</style>
