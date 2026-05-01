<template>
	<Select
		v-model="value"
		v-model:search="search"
		:items
		:multiple
		:label
		:error
		searchable
		@update:search="handleContextChange"
	/>
</template>

<script setup lang="ts">
import { computed, type Ref, ref, watch } from 'vue'

import { Select } from '@/components/blocks'
import { Http } from '@/plugins'

import type { Item, Items, Props } from './props'
import { defaultProps } from './props'

const props = withDefaults(defineProps<Props>(), defaultProps)

const items: Ref<Item[]> = ref([])

const emit = defineEmits(['update:model-value'])
const value = computed<string[] | string>({
	get: () => props.modelValue,
	set(value) {
		if (props.multiple && Array.isArray(props.modelValue) && Array.isArray(value)) {
			emit('update:model-value', [...value])
		} else if (typeof value === 'string') {
			emit('update:model-value', value)
		}
	}
})

const getSort = (entity: string | string[]) => {
	let sort = ''

	if (typeof entity === 'string' && entity.length) {
		sort = 'name'
	} else if (Array.isArray(entity) && entity.length) {
		sort = 'name'
	}

	return sort
}

const getPayload = (entity: string | string[], isIncluded = false) => {
	let filter = ''

	const sign = isIncluded ? '=' : '~'
	if (typeof entity === 'string' && entity.length) {
		filter = '('

		if (isIncluded) filter += `id='${entity}'`
		else {
			props.filterFields.forEach(field => {
				if (filter) {
					filter += `${field}${sign}'${entity.toLowerCase()}' || `
				}
			})
			filter = filter.slice(0, filter.length - 3).trim()
		}

		filter += ')'
	} else if (Array.isArray(entity) && entity.length) {
		filter = '('

		entity
			.filter(item => !(props.exclude ?? []).includes(item))
			.forEach(item => {
				if (isIncluded) {
					if (filter) {
						filter += `id='${item}' || `
					}
				} else {
					props.filterFields.forEach((field: string) => {
						if (item) {
							if (filter) {
								filter += `${field}${sign}'${item.toLowerCase()}' || `
							}
						}
					})
				}
			})

		filter = filter.slice(0, filter.length - 3).trim()
		if (filter.length > 0) {
			filter += ')'
		}
	}

	return filter
}

const loadItems = async (include?: string | string[]) => {
	let _defaultItems: Item[] = []
	let _searchItems: Item[] = []
	let _extraItems: Item[] = []

	const loadDefaultItems = async () => {
		if (search.value.length === 0) {
			await Http.get<Items>(`/collections/${props.api}/records`, {
				filter: {
					id: () => ({
						value: props.exclude ?? [],
						props: {
							sign: '!='
						}
					})
				}
			}).then(response => {
				_defaultItems = response.items
			})
		}
	}
	const loadSearchItems = async () => {
		if (search.value.length > 0) {
			await Http.get<Items>(`/collections/${props.api}/records`, {
				sort: getSort(search.value),
				filter: getPayload(search.value)
			}).then(response => {
				_searchItems = response.items
			})
		}
	}
	const loadExtraItems = async () => {
		if (include?.length) {
			await Http.get<Items>(`/collections/${props.api}/records`, {
				sort: getSort(include),
				filter: getPayload(include, true)
			}).then(response => {
				_extraItems = response.items
			})
		}
	}

	await Promise.all([loadDefaultItems(), loadSearchItems(), loadExtraItems()])

	_defaultItems = _defaultItems.filter(
		defaultItem => !_extraItems.some(extraItem => extraItem.id === defaultItem.id)
	)
	_searchItems = _searchItems.filter(
		searchItem => !_extraItems.some(extraItem => extraItem.id === searchItem.id)
	)
	items.value = [..._extraItems, ..._searchItems, ..._defaultItems]
}

const search = ref('')

const handleContextChange = async () => {
	const selectedValue = value.value
	if (props.multiple && Array.isArray(selectedValue)) {
		await loadItems(selectedValue)
	} else if (typeof selectedValue === 'string' && !Array.isArray(selectedValue)) {
		await loadItems(selectedValue)
	}
}

watch(() => [value.value, props.exclude], handleContextChange, { immediate: true })
</script>