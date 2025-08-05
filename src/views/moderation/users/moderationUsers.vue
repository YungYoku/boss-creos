<template>
	<Table
		:header
		:body
		:cells
		@reload="loadCreatives"
	/>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { Table } from '@/components/structures'
import { IUsers } from '@/types/user.ts'
import { Http } from '@/plugins'

import { useAdapter } from './adapter'

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
		.get<IUsers>('/collections/users/records', {
			fields,
			filter: 'status=\'moderation\'',
			expand: ['avatar'],
			perPage: 12,
			page: 1
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
void loadData()
</script>
