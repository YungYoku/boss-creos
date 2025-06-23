<template>
	<div class="shop">
		<div
			v-if="creatives.length || loading"
			class="shop__creatives"
		>
			<template v-if="loading">
				<EmptyCreativeCard
					v-for="i in 8"
					:key="i"
					class="shop__creatives-item"
				/>
			</template>
			<template v-else>
				<CreativeCard
					v-for="creative in creatives"
					:key="creative.id"
					:creative="creative"
					:loading="loading"
					class="shop__creatives-item"
				/>
			</template>
		</div>
		<span v-else>Нет доступных объявлений.</span>
	</div>

	<Table/>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { Table } from '@/components/structures'
import { CreativeCard, EmptyCreativeCard } from '@/components/blocks'
import { ICreative, ICreatives } from '@/interfaces/Creative.ts'
import { Http } from '@/plugins'

const creatives = ref<Array<ICreative>>([])

const loading = ref(true)
const loadCreatives = async () => {
	await Http
		.get<ICreatives>('/collections/creatives/records', {
			filter: 'status=\'moderation\'',
			expand: ['preview', 'video', 'creator'],
			perPage: 12
		})
		.then(res => {
			creatives.value = res.items
		})
}

const loadData = async () => {
	loading.value = true

	await loadCreatives()

	loading.value = false
}
loadData()
</script>

<style scoped lang="scss">
.shop {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 56px;

	&__creatives {
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