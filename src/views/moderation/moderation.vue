<template>
	<Table
		:header
		:data="body"
	/>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'

import { Table } from '@/components/structures'
import { ICreative, ICreatives } from '@/interfaces/Creative.ts'
import { Http } from '@/plugins'
import { IHeader, IRow, IRows } from '@/interfaces/Table.ts'

const header: Ref<IHeader> = ref([])
const body: Ref<IRows> = ref([])

const generateHeader = (item: ICreative) => {
	const keys = Object.keys(item)
	header.value = keys.map(name => ({ name }))
}

const generateBody = (items: Array<ICreative>) => {
	body.value = items.map(item => {
		const keys = Object.keys(item) as Array<keyof typeof item>
		return keys.reduce((result, key) => {
			const value = item[key]
			result.push({
				key,
				value
			})
			return result
		}, [] as IRow)
	})
}

const loading = ref(true)
const loadCreatives = async () => {
	await Http
		.get<ICreatives>('/collections/creatives/records', {
			filter: 'status=\'moderation\'',
			expand: ['preview', 'video', 'creator'],
			perPage: 12
		})
		.then(res => {
			generateHeader(res.items[0])
			generateBody(res.items)
		})
}

const loadData = async () => {
	loading.value = true

	await loadCreatives()

	loading.value = false
}
loadData()
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

		@media (max-width: 1024px) {
			max-width: calc((100% - 15px) / 2);
		}

		@media (max-width: 600px) {
			max-width: 100%;
		}
	}
}
</style>