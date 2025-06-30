<template>
	<Grid
		class="creative"
		vertical
		:columns="1"
		gap="l"
	>
		<Grid :columns="['430px', 1]">
			<CreativeCard
				:creative="creative"
				for-sale
			/>

			<div class="creative__info">
				<div class="creative__name">
					{{ creative.expand?.slot?.name }}
				</div>

				<div class="creative__info-item">
					Creo ID: {{ creative.id }}
				</div>

				<div class="creative__info-item">
					Geo: {{ creative.expand?.geo?.name }}
				</div>

				<div class="creative__info-item">
					Size: {{ creative.ratio }}
				</div>

				<div class="creative__info-item">
					Resize: {{ creative.resize ? 'Делаю' : 'Не делаю' }}
				</div>

				<div class="creative__info-item">
					Reskin: {{ creative.reskin ? 'Делаю' : 'Не делаю' }}
				</div>

				<div class="creative__info-item">
					Подход: {{ creative.expand?.approach?.name }}
				</div>

				<div class="creative__separator"/>

				<div class="creative__description">
					<span class="creative__description-title">
						Описание:
					</span>
					{{ creative.description }}
				</div>
			</div>
		</Grid>
	</Grid>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

import { Grid } from '@/components/structures'
import { Http } from '@/plugins'
import { emptyCreative, ICreative } from '@/interfaces/Creative.ts'
import CreativeCard from '@/components/blocks/creativeCard.vue'

const creative: Ref<ICreative> = ref({ ...emptyCreative })
const route = useRoute()
const { id } = route.params

const loading = ref(true)
const loadProject = async () => {
	if (!id) return

	await Http
		.get<ICreative>(`/collections/creatives/records/${id}`, {
			expand: ['creator', 'preview', 'video', 'slot', 'geo', 'approach']
		})
		.then(response => {
			creative.value = response
		})

	loading.value = false
}
loadProject()
</script>

<style scoped lang="scss">
.creative {
	padding: 60px 0 0 0;

	&__name {
		font-size: 40px;
		line-height: 1.5;
		font-weight: 600;
	}

	&__info {
		display: flex;
		flex-direction: column;

		width: 100%;
		gap: 10px;
	}

	&__info-item {
		font-size: 16px;
		line-height: 1;
		font-weight: 400;
	}

	&__separator {
		width: 60%;
		height: 1px;
		margin: 20px 0;

		background: linear-gradient(to right, #ffffff 20%, rgba(255, 255, 255, 0));
	}

	&__description-title {
		font-size: 20px;
		line-height: 1;
		font-weight: 700;
	}

	&__description {
		font-size: 20px;
		line-height: 1;
		font-weight: 600;
	}
}
</style>