<template>
	<div class="shop">
		<Island>
			<Grid :columns="[6, 1]">
				<Grid
					:columns="4"
					@keyup.enter="loadData"
				>
					<SelectLiveRich
						v-model="form.geo.value"
						label="Свободные гео"
						api="geo"
					/>

					<SelectRich
						v-model="form.type.value"
						label="Вид крео"
						:items="creativeTypeItems"
					/>

					<SelectLiveRich
						v-model="form.slot.value"
						label="Слот"
						api="slots"
					/>

					<SelectLiveRich
						v-model="form.approach.value"
						label="Подход"
						api="approaches"
					/>

					<SelectRich
						v-model="form.ratio.value"
						label="Размер"
						:items="ratioItems"
					/>
				</Grid>

				<Grid vertical>
					<Button
						:disabled="loading"
						variant="outline"
						@click="loadData"
					>
						Применить
					</Button>

					<Button
						:disabled="loading"
						variant="outline"
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
import {type Ref, ref} from 'vue'
import {useSearchStore} from '@/stores/search'

import {Grid, Island} from '@/components/structures'
import {Button, CreativeCard, EmptyCreativeCard, SelectLiveRich, SelectRich} from '@/components/blocks'
import type {ICreative, ICreatives, ICreativeStatus, ICreativeType, IRatio} from '@/types/creative'
import {creativeTypeItems, ratioItems} from '@/types/creative'
import {Form, Http} from '@/plugins'

type SearchForm = {
	geo: string
	slot: string
	approach: string
	type: ICreativeType | ''
	ratio: IRatio | ''
	status: Exclude<ICreativeStatus, 'moderation'>
}

const creatives: Ref<Array<ICreative>> = ref([])

const searchStore = useSearchStore()

const form = Form<SearchForm>({
	geo: '',
	slot: '',
	approach: '',
	type: '',
	ratio: '',
	status: 'approved'
})

const loading = ref(true)
const loadCreatives = async () => {
	const filters = []
	let filter = ''
	let encodedFilter = ''

	if (form.geo.value) filters.push(`unavailableGeo!~'${form.geo.value}'`)
	if (form.slot.value) filters.push(`slot='${form.slot.value}'`)
	if (form.approach.value) filters.push(`approach='${form.approach.value}'`)
	if (form.ratio.value) filters.push(`ratio='${form.ratio.value}'`)
	if (form.type.value) filters.push(`type='${form.type.value}'`)
	filters.push(`status='${form.status.value}'`)
	if (filters.length) {
		filter = filters.reduce((acc, filter) => filter ? `${acc} && ${filter}` : acc, '')
		filter = filter.slice(4)

		encodedFilter = encodeURIComponent(filter)
	}

	await Http
		.get<ICreatives>('/collections/creatives/records', {
			filter: encodedFilter,
			expand: ['preview', 'video', 'creator', 'creator.avatar'],
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
void loadData()
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