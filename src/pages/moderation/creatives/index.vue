<template>
	<Table :header :body :cells @reload="loadCreatives" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { Table } from '@/components/structures'
import type { ICreatives } from '@/types/creative'
import { Http } from '@/plugins'
import { ADMIN, AUTH } from '@/data/permissions'

import { useAdapter } from './adapter'

definePage({
	meta: {
		permissions: [AUTH, ADMIN],
	},
})

const { handleLoadedData, header, body, fields, cells } = useAdapter()

const loading = ref(true)
const loadCreatives = async () => {
	await Http.get<ICreatives>('/collections/creatives/records', {
		fields,
		filter: "status='moderation'",
		expand: [
			'approach',
			'preview',
			'video',
			'creator',
			'creator.avatar',
			'slot',
			'geo',
			'unavailableGeo',
		],
		perPage: 12,
		page: 1,
	}).then((res) => {
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