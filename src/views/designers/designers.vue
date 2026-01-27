<template>
	<div class="designers">
		<div
			v-if="users.length || loading"
			class="designers__content"
		>
			<UserCard
				v-for="user in users"
				:key="user.id"
				:user="user"
				link
				:loading="loading"
				class="designers__item"
			/>
		</div>
		<span v-else>Нет дизайнеров.</span>
	</div>
</template>

<script lang="ts" setup>
import { type Ref, ref } from 'vue'

import { UserCard } from '@/components/blocks'
import type { IUser, IUsers } from '@/types/user'
import { Http } from '@/plugins'

const users: Ref<IUser[]> = ref([])

const loading = ref(true)
const loadDesigners = async () => {
	await Http
		.get<IUsers>('/collections/users/records', {
			filter: 'role=\'designer\'',
			expand: ['avatar'],
			perPage: 12
		})
		.then(res => {
			users.value = res.items
		})
}

const loadData = async () => {
	loading.value = true

	await loadDesigners()

	loading.value = false
}
void loadData()
</script>

<style scoped lang="scss">
.designers {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 56px;

	&__content {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;

		width: 100%;
		max-width: 100%;
		gap: 20px;

		margin: 0 auto;

		@media (max-width: 1024px) {
			gap: 15px;
		}

		@media (max-width: 600px) {
			gap: 15px;
		}
	}

	&__item {
		max-width: calc((100% - 40px) / 3);
		width: 100%;

		@media (max-width: 1024px) {
			max-width: calc((100% - 15px) / 2);
		}

		@media (max-width: 600px) {
			max-width: 100%;
		}
	}
}
</style>