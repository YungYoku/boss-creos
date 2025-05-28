<template>
	<Grid
		:columns="1"
	>
		<Grid
			:columns="4"
			@keyup.enter="loadData"
		>
			<Input
				v-model="search"
				label="Поиск"
			/>

			<SelectLive
				v-model="form.geo.value"
				label="Гео"
				api="geo"
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

		<Grid
			v-if="creatives.length || loading"
			:columns-xl="3"
			:columns-l="2"
			:columns-m="1"
		>
			<template v-if="loading">
				<EmptyCreativeCard
					v-for="i in 8"
					:key="i"
				/>
			</template>
			<template v-else>
				<CreativeCard
					v-for="creative in creatives"
					:key="creative.id"
					:creative="creative"
					:loading="loading"
				/>
			</template>
		</Grid>
		<span v-else>Нет доступных объявлений.</span>
	</Grid>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useSearchStore } from '@/stores/search.ts'

import { Grid } from '@/components/structures'
import { Button, CreativeCard, EmptyCreativeCard, Input, Select, SelectLive } from '@/components/blocks'
import { ICreative, ICreatives, IRatio, ratioItems } from '@/interfaces/Creative.ts'
import { Form, Http } from '@/plugins'

interface SearchForm {
	geo: string
	slot: string
	approach: string
	ratio: IRatio | ''
}

const creatives = ref<Array<ICreative>>([])

const searchStore = useSearchStore()

const _search = ref('')
const search = computed({
	get: () => _search.value,
	set: (value) => {
		_search.value = value
		searchStore.update(value)
	}
})
watch(() => searchStore.search, (value) => {
	search.value = value
}, { immediate: true })

const form = Form<SearchForm>({
	geo: '',
	slot: '',
	approach: '',
	ratio: ''
})

const loading = ref(true)
const loadCreatives = async () => {
	const filters = []
	let filter = ''
	let encodedFilter = ''

	const searchValue = search.value?.toLowerCase?.()
	if (searchValue) filters.push(`(description~'${searchValue}')`)
	if (form.geo.value) filters.push(`geo='${form.geo.value}'`)
	if (form.slot.value) filters.push(`slot='${form.slot.value}'`)
	if (form.approach.value) filters.push(`approach='${form.approach.value}'`)
	if (form.ratio.value) filters.push(`ratio='${form.ratio.value}'`)
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