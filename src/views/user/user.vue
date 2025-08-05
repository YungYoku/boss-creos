<template>
	<div class="user">
		<Grid
			:columns-xl="['400px', 1]"
			gap="xl"
		>
			<Grid
				vertical
				:columns="1"
				hor-align="center"
			>
				<Avatar
					size="xl"
					:user="user"
				/>
			</Grid>

			<Grid
				:columns="1"
				vertical
			>
				<div
					class="user__name"
					size="m"
				>
					{{ user?.username }}
				</div>

				<div
					class="user__description"
					size="m"
				>
					{{ user?.description }}
				</div>
			</Grid>
		</Grid>

		<div
			v-if="creatives.length || loadingCreatives"
			class="user__creatives"
		>
			<template v-if="loadingCreatives">
				<EmptyCreativeCard
					v-for="i in 8"
					:key="i"
					class="main__creatives-item"
				/>
			</template>
			<template v-else>
				<CreativeCard
					v-for="creative in creatives"
					:key="creative.id"
					class="main__creatives-item"
					:creative="creative"
				/>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { Http } from '@/plugins'
import { Grid } from '@/components/structures'
import { Avatar, CreativeCard, EmptyCreativeCard } from '@/components/blocks'
import { IUser } from '@/types/user.ts'
import { ICreative, ICreatives } from '@/types/creative.ts'

const route = useRoute()

const loading = ref(true)
const user: Ref<IUser | null> = ref(null)

const loadingCreatives = ref(true)
const creatives: Ref<Array<ICreative>> = ref([])

const loadCreatives = async () => {
	const id = route.params.id
	if (!id || Array.isArray(id)) return

	loadingCreatives.value = true

	const filter = 'status=\'approved\'&&creator=\'${id}\''
	const encodedFilter = encodeURIComponent(filter)

	await Http
		.get<ICreatives>('/collections/creatives/records', {
			filter: encodedFilter,
			expand: ['preview', 'video', 'creator', 'creator.avatar'],
			perPage: 12
		})
		.then(res => {
			creatives.value = res.items
		})

	loadingCreatives.value = false
}
void loadCreatives()

const loadUser = async () => {
	const id = route.params.id
	if (!id || Array.isArray(id)) return

	loading.value = true

	await Http
		.get<IUser>(`/collections/users/records/${id}`, {
			expand: ['avatar']
		})
		.then(res => {
			user.value = res
		})

	loading.value = false
}
watch(() => route.params.id, loadUser, { immediate: true })
</script>

<style scoped lang="scss">
.user {
	width: 1240px;
	max-width: 100%;

	&__name {
		font-weight: 600;
		font-size: 40px;
	}

	&__description {
		font-weight: 300;
		font-size: 16px;
	}

	&__creatives {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;

		width: 100%;
		max-width: 100%;
		gap: 20px;

		margin: 120px auto 40px auto;

		@media (max-width: 1024px) {
			gap: 15px;
		}

		@media (max-width: 600px) {
			gap: 15px;
		}
	}

	&__creatives-item.creative-card {
		max-width: calc((100% - 40px) / 3);

		@media (max-width: 1024px) {
			max-width: calc((100% - 15px) / 2);
		}

		@media (max-width: 600px) {
			max-width: 100%;
		}
	}
}
</style>