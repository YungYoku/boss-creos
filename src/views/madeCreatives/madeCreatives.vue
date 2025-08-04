<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
		class="made-creatives"
	>
		<div class="made-creatives__title">
			Мои креативы
		</div>

		<div
			v-if="creatives.length || loading"
			class="made-creatives__creatives"
		>
			<template v-if="loading">
				<EmptyCreativeCard
					v-for="i in 8"
					:key="i"
					class="main__creatives-item"
				/>
			</template>
			<template v-else>
				<CreativeCard
					v-for="creative in creatives"
					:key="creative.id"
					class="main__creatives-item"
					:creative="creative"
				/>
			</template>
		</div>
	</Grid>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

import { Grid } from '@/components/structures'
import { CreativeCard, EmptyCreativeCard } from '@/components/blocks'
import { Http } from '@/plugins'
import { ICreative, ICreatives } from '@/types/Creative.ts'

const auth = useAuthStore()

const creatives: Ref<Array<ICreative>> = ref([])

const loading = ref(true)
const getUserCreatives = async () => {
	if (auth.user.id === '') return

	loading.value = true

	await Http
		.get<ICreatives>('/collections/creatives/records', {
			filter: `creator='${auth.user.id}'`,
			expand: ['preview', 'video', 'creator', 'creator.avatar', 'slot']
		})
		.then(response => {
			creatives.value = response.items
		})

	loading.value = false
}

watch(() => auth.user.id, getUserCreatives, { immediate: true })
</script>

<style scoped lang="scss">
.made-creatives {
	&__title {
		font-size: 32px;
		font-weight: 700;
		color: #ffffff;
		text-align: center;
		margin: 0 0 20px 0;
	}

	&__creatives {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;

		width: 100%;
		max-width: 100%;
		gap: 20px;

		margin: 40px auto 40px auto;

		@media (max-width: 1024px) {
			gap: 15px;
		}

		@media (max-width: 600px) {
			gap: 15px;
		}
	}
}
</style>