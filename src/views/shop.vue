<template>
	<div class="shop">
		<Island>
			<Grid :columns="[6, 1]">
				<Grid
					:columns="4"
					@keyup.enter="loadData"
				>
					<SelectLive
						v-model="form.geo.value"
						label="Свободные гео"
						api="geo"
					/>

					<Select
						v-model="form.type.value"
						label="Вид крео"
						:items="cretiveTypeItems"
					/>

					<SelectLive
						v-model="form.slot.value"
						label="Слот"
						api="slots"
					/>

					<SelectLive
						v-model="form.approach.value"
						label="Подход"
						api="approaches"
					/>

					<Select
						v-model="form.ratio.value"
						label="Размер"
						:items="ratioItems"
					/>
				</Grid>

				<Grid vertical>
					<Button
						:disabled="loading"
						@click="loadData"
					>
						Применить
					</Button>

					<Button
						:disabled="loading"
						@click="form.reset"
					>
						Очистить
					</Button>
				</Grid>
			</Grid>
		</Island>

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
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useSearchStore } from '@/stores/search.ts'

import { Grid, Island } from '@/components/structures'
import { Button, CreativeCard, EmptyCreativeCard, Select, SelectLive } from '@/components/blocks'
import { cretiveTypeItems, ICreative, ICreatives, ICreativeType, IRatio, ratioItems } from '@/interfaces/Creative.ts'
import { Form, Http } from '@/plugins'

interface SearchForm {
	geo: string
	slot: string
	approach: string
	type: ICreativeType | ''
	ratio: IRatio | ''
}

const creatives = ref<Array<ICreative>>([])

const searchStore = useSearchStore()

const form = Form<SearchForm>({
	geo: '',
	slot: '',
	approach: '',
	type: '',
	ratio: ''
})

const loading = ref(true)
const loadCreatives = async () => {
	const filters = []
	let filter = ''
	let encodedFilter = ''

	if (form.geo.value) filters.push(`geo='${form.geo.value}'`)
	if (form.slot.value) filters.push(`slot='${form.slot.value}'`)
	if (form.approach.value) filters.push(`approach='${form.approach.value}'`)
	if (form.ratio.value) filters.push(`ratio='${form.ratio.value}'`)
	if (form.type.value) filters.push(`type='${form.type.value}'`)
	if (filters.length) {
		filter = filters.reduce((acc, filter) => filter ? `${acc} && ${filter}` : acc, '')
		filter = filter.slice(4)

		encodedFilter = encodeURIComponent(filter)
	}

	await Http
		.get<ICreatives>('/collections/creatives/records', {
			filter: encodedFilter,
			expand: ['preview', 'video', 'creator'],
			perPage: 12
		})
		.then(res => {
			creatives.value = res.items
		})
}

const loadData = async () => {
	loading.value = true
	searchStore.setLoading(true)

	await loadCreatives()

	loading.value = false
	searchStore.setLoading(false)
}
loadData()
</script>

<style scoped lang="scss">
.shop {
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