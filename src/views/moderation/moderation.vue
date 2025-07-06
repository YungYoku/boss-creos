<template>
	<Table
		:header
		:body
		:cells
	/>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { Table } from '@/components/structures'
import { ICreatives } from '@/interfaces/Creative.ts'
import { Http } from '@/plugins'
import { useAdapter } from '@/views/moderation/adapter.ts'

const {
	handleLoadedData,
	header,
	body,
	fields,
	cells
} = useAdapter()

const loading = ref(true)
const loadCreatives = async () => {
	await Http
		.get<ICreatives>('/collections/creatives/records', {
			fields,
			filter: 'status=\'moderation\'',
			expand: ['preview', 'video', 'creator', 'slot'],
			perPage: 12
		})
		.then(res => {
			handleLoadedData(res.items)
		})
}

const loadData = async () => {
	loading.value = true

	await loadCreatives()

	loading.value = false
}
loadData()
</script>
