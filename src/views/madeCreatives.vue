<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Grid :columns="1">
			<PageTitle>
				Мои креативы
			</PageTitle>
		</Grid>

		<Grid
			:columns-xl="4"
			:columns-l="3"
			:columns-m="2"
			:columns-s="1"
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
				/>
			</template>
		</Grid>
	</Grid>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import { Grid } from '@/components/structures'
import { CreativeCard, EmptyCreativeCard } from '@/components/blocks'
import { PageTitle } from '@/components/elements'
import { Http } from '@/plugins'
import { ICreative, ICreatives } from '@/interfaces/Creative.ts'

const auth = useAuthStore()

const creatives = ref<Array<ICreative>>([])

const loading = ref(true)
const getUserCreatives = async () => {
	if (auth.user.id === '') return

	loading.value = true

	await Http
		.get<ICreatives>('/collections/creatives/records', {
			filter: `creator='${auth.user.id}'`,
			expand: ['preview', 'video', 'creator', 'slot']
		})
		.then(response => {
			creatives.value = response.items
		})

	loading.value = false
}

watch(() => auth.user.id, getUserCreatives, { immediate: true })
</script>
