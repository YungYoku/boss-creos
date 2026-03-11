<template>
	<Table :header :body :cells @reload="loadCreatives" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { Table } from '@/components/structures'
import type { IUsers } from '@/types/user'
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
	await Http.get<IUsers>('/collections/users/records', {
		fields,
		filter: "status='moderation'",
		expand: ['avatar'],
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