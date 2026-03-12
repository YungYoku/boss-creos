<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
		class="favorite"
	>
		<div class="favorite__title">Избранное</div>

		<div
			v-if="favorite.length === 0"
			class="favorite__empty"
		>
			Пусто
		</div>

		<div
			v-else-if="creatives.length || loading"
			class="favorite__creatives"
		>
			<template v-if="loading">
				<EmptyCreativeCard
					v-for="i in 8"
					:key="i"
					class="favorite__creatives-item"
				/>
			</template>
			<template v-else>
				<CreativeCard
					v-for="creative in creatives"
					:key="creative.id"
					class="favorite__creatives-item"
					:creative="creative"
				/>
			</template>
		</div>
	</Grid>
</template>

<script setup lang="ts">
import { computed, type Ref, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import { Grid } from '@/components/structures'
import { CreativeCard, EmptyCreativeCard } from '@/components/blocks'
import { Http } from '@/plugins'
import type { ICreative, ICreatives } from '@/types/creative'
import { AUTH, BUYER } from '@/data/permissions'

definePage({
	meta: {
		permissions: [AUTH, BUYER]
	}
})

const auth = useAuthStore()

const creatives: Ref<ICreative[]> = ref([])
const favorite = computed(() => auth.user.favorite)

const loading = ref(true)
const loadFavorite = async () => {
	if (auth.user.id === '') return

	if (favorite.value.length === 0) return

	const favoriteIds = favorite.value.map(id => `id = '${id}'`).join(' || ')

	loading.value = true

	await Http.get<ICreatives>('/collections/creatives/records', {
		filter: favoriteIds,
		expand: ['preview', 'video', 'creator', 'creator.avatar', 'slot']
	}).then(response => {
		creatives.value = response.items
	})

	loading.value = false
}

watch(() => auth.user.id, loadFavorite, { immediate: true })
</script>

<style scoped>
.favorite {
	.favorite__title {
		font-size: 32px;
		font-weight: 700;
		color: #fff;
		text-align: center;
		margin: 0 0 20px;
	}

	.favorite__creatives {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		max-width: 100%;
		gap: 20px;
		margin: 40px auto;

		@media (max-width: 1024px) {
			gap: 15px;
		}

		@media (max-width: 600px) {
			gap: 15px;
		}
	}
}
</style>