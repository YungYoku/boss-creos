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

<script setup lang="ts" generic="T extends string | string[]">
import { computed, type Ref, ref, watch } from 'vue'

import { Select } from '@/components/blocks'
import { Http } from '@/plugins'
import type { Filter } from '@/plugins/http'

import type { Item, Items, Props } from './props'
import { defaultProps } from './props'

const props = withDefaults(defineProps<Props>(), defaultProps)

const items: Ref<Item[]> = ref([])

const rawValue = defineModel<T>({
	default: []
})

const value = computed<T>({
	get: () => rawValue.value,
	set(value) {
		if (props.multiple && Array.isArray(rawValue.value) && Array.isArray(value)) {
			rawValue.value = [...value] as T
		} else if (typeof value === 'string') {
			rawValue.value = value
		}
	}
})

const getSort = (entity: T) => {
	if (typeof entity === 'string' && entity.length) {
		return 'name'
	} else if (Array.isArray(entity) && entity.length) {
		return 'name'
	}

	return ''
}

const getPayload = (entity: T, isIncluded = false): Filter => {
	const sign = isIncluded ? '=' : '~'
	if (typeof entity === 'string' && entity.length) {
		if (isIncluded) {
			return {
				id: entity
			}
		} else {
			const keys = Object.keys(props.filterFields)
			return keys.reduce((acc, key) => {
				acc[key] = () => ({
					value: [entity],
					props: {
						sign,
						separator: '||'
					}
				})
				return acc
			}, {} as Filter)
		}
	} else if (Array.isArray(entity) && entity.length) {
		const filteredEntity = entity.filter(item => !(props.exclude ?? []).includes(item))

		if (isIncluded) {
			return {
				id: () => ({
					value: filteredEntity,
					props: {
						sign: '=',
						separator: '||'
					}
				})
			}
		} else {
			return props.filterFields.reduce((acc, key) => {
				acc[key] = () => ({
					value: filteredEntity,
					props: {
						sign,
						separator: '||'
					}
				})
				return acc
			}, {} as Filter)
		}
	}

	return {}
}

const loadItems = async (include?: T) => {
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
				sort: getSort(search.value as T),
				filter: getPayload(search.value as T)
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

const search: Ref<string> = ref('')

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