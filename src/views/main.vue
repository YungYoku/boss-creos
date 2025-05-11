<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Text size="l">
			Фильтры
		</Text>
		<Grid
			v-if="creatives.length || loadingProject"
			:columns-xl="4"
			:columns-l="3"
			:columns-m="2"
			:columns-s="1"
		>
			<template v-if="loadingProject">
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
				/>
			</template>
		</Grid>
		<Text
			v-else
			size="xs"
		>
			Нет доступных объявлений.
		</Text>
	</Grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { ICreative, ICreatives } from '@/interfaces/Creative.ts'
import { Grid } from '@/components/structures'
import { EmptyCreativeCard, CreativeCard } from '@/components/blocks'
import { Text } from '@/components/elements'
import { Http } from '@/plugins'

const loadingProject = ref(true)
const creatives = ref<Array<ICreative>>([])
const loadProject = async () => {
	loadingProject.value = true

	await Http
		.get<ICreatives>('/collections/creatives/records', {
			perPage: 12
		})
		.then(res => {
			creatives.value = res.items
		})

	loadingProject.value = false
}
loadProject()
</script>