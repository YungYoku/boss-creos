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
			{{ user.username }}
		</template>
	</Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/structures'
import { Image } from '@/components/elements'
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
	&__image {
		width: 100%;
		max-width: 100%;

		border-radius: 10px;
		object-fit: cover;
		aspect-ratio: 1 / 1;
	}
}
</style>
