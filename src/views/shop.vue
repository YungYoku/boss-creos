<template>
	<Grid
		:columns-xl="['300px', 1]"
		:columns-s="1"
	>
		<Grid
			vertical
			@keyup.enter="loadData"
		>
			<Input
				v-model="search"
				label="Поиск"
			/>

			<Input
				v-model="form.priceFrom.value"
				:error="form.priceFrom.error"
				label="Оплата от"
			/>

			<Input
				v-model="form.priceTo.value"
				:error="form.priceTo.error"
				label="Оплата до"
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
import {
	EmptyCreativeCard,
	CreativeCard,
	Button,
	Input,
} from '@/components/blocks'
import { ICreative, ICreatives } from '@/interfaces/Creative.ts'
import { Form, Http } from '@/plugins'

interface SearchForm {
	priceFrom: string
	priceTo: string
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
	priceFrom: '',
	priceTo: '',
})

const loading = ref(true)
const loadCreatives = async () => {
	const filters = []
	let filter = ''
	let encodedFilter = ''

	const searchValue = search.value?.toLowerCase?.()
	if (searchValue) filters.push(`(description~'${searchValue}')`)
	if (form.priceFrom.value) filters.push(`price>=${form.priceFrom.value}`)
	if (form.priceTo.value) filters.push(`price<=${form.priceTo.value}`)
	if (filters.length) {
		filter = filters.reduce((acc, filter) => filter ? `${acc} && ${filter}` : acc, '')
		filter = filter.slice(4)

		encodedFilter = encodeURIComponent(filter)
	}

	await Http
		.get<ICreatives>('/collections/creatives/records', {
			filter: encodedFilter,
			expand: ['preview', 'creator'],
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