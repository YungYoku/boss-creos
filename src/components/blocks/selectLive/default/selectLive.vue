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
	},
})

const getExcludedItems = () => {
	if (props.exclude) {
		let result = '('
		props.exclude.forEach((item) => {
			result += `id!='${item}' && `
		})
		result = result.slice(0, result.length - 3).trim()
		if (result) {
			result += ')'
			return encodeURIComponent(result)
		}

		return ''
	}

	return ''
}

const getPayload = (entity: string | string[], isIncluded = false) => {
	const payload: {
		sort?: string
		filter?: string
	} = {}

	const sign = isIncluded ? '=' : '~'
	if (typeof entity === 'string' && entity.length) {
		payload.sort = 'name'
		payload.filter = '('

		if (isIncluded) payload.filter += `id='${entity}'`
		else {
			props.filterFields.forEach((field) => {
				if (payload.filter) {
					payload.filter += `${field}${sign}'${entity.toLowerCase()}' || `
				}
			})
			payload.filter = payload.filter.slice(0, payload.filter.length - 3).trim()
		}

		payload.filter += ')'
	} else if (Array.isArray(entity) && entity.length) {
		payload.sort = 'name'
		payload.filter = '('

		entity
			.filter((item) => !(props.exclude ?? []).includes(item))
			.forEach((item) => {
				if (isIncluded) {
					if (payload.filter) {
						payload.filter += `id='${item}' || `
					}
				} else {
					props.filterFields.forEach((field: string) => {
						if (item) {
							if (payload.filter) {
								payload.filter += `${field}${sign}'${item.toLowerCase()}' || `
							}
						}
					})
				}
			})

		payload.filter = payload.filter.slice(0, payload.filter.length - 3).trim()
		if (payload.filter.length > 0) {
			payload.filter += ')'
		}
	}

	if (Object.keys(payload).length > 0) return payload
	return null
}

const loadItems = async (include?: string | string[]) => {
	let _defaultItems: Item[] = []
	let _searchItems: Item[] = []
	let _extraItems: Item[] = []

	const loadDefaultItems = async () => {
		if (search.value.length === 0) {
			await Http.get<Items>(`/collections/${props.api}/records`, {
				filter: getExcludedItems(),
			}).then((response) => {
				_defaultItems = response.items
			})
		}
	}
	const loadSearchItems = async () => {
		if (search.value.length > 0) {
			await Http.get<Items>(
				`/collections/${props.api}/records`,
				getPayload(search.value),
			).then((response) => {
				_searchItems = response.items
			})
		}
	}
	const loadExtraItems = async () => {
		if (include?.length) {
			await Http.get<Items>(
				`/collections/${props.api}/records`,
				getPayload(include, true),
			).then((response) => {
				_extraItems = response.items
			})
		}
	}

	await Promise.all([loadDefaultItems(), loadSearchItems(), loadExtraItems()])

	_defaultItems = _defaultItems.filter(
		(defaultItem) => !_extraItems.some((extraItem) => extraItem.id === defaultItem.id),
	)
	_searchItems = _searchItems.filter(
		(searchItem) => !_extraItems.some((extraItem) => extraItem.id === searchItem.id),
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