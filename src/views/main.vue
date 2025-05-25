<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<div class="main__prologue">
			<div class="main__prologue-info">
				<div class="main__prologue-text">
					<span>Закажи крео по своему ТЗ</span>
					<span>Или выбери уже готовое прямо сейчас</span>
				</div>
			</div>
			
			<div class="main__prologue-creatives">
				<CreativeCard
					v-if="creatives[0]"
					class="main__prologue-creative"
					:creative="creatives[0]"
				/>
				<CreativeCard
					v-if="creatives[1]"
					class="main__prologue-creative"
					:creative="creatives[1]"
				/>
			</div>
		</div>

		<div
			v-if="creatives.length || loadingProject"
			class="main__creatives"
		>
			<template v-if="loadingProject">
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

			<router-link
				to="/shop"
			>
				Смотреть ещё
			</router-link>
		</div>

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
import { CreativeCard, EmptyCreativeCard } from '@/components/blocks'
import { Text } from '@/components/elements'
import { Http } from '@/plugins'

const loadingProject = ref(true)
const creatives = ref<Array<ICreative>>([])
const loadProject = async () => {
	loadingProject.value = true

	await Http
		.get<ICreatives>('/collections/creatives/records', {
			expand: ['preview', 'creator'],
			perPage: 12
		})
		.then(res => {
			creatives.value = res.items
		})

	loadingProject.value = false
}
loadProject()
</script>

<style scoped lang="scss">
.main {
	&__prologue {
		display: flex;
		justify-content: space-between;

		width: 1240px;
		max-width: 100%;
		min-height: 600px;
		margin: 0 auto;
		gap: 20px;
	}

	&__prologue-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	&__prologue-text {
		display: flex;
		flex-direction: column;

		font-weight: 700;

		span:nth-child(1) {
			font-size: 32px;
		}
		span:nth-child(2) {
			font-size: 20px;
		}
	}

	&__prologue-creatives {
		position: relative;

		width: 50%;
	}

	&__prologue-creative {
		position: absolute;
		&:nth-child(1) {
			right: 0;
			z-index: 1;
		}
		&:nth-child(2) {
			top: 90px;
			left: 0;
			z-index: 2;
		}
	}

	&__creatives {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;

		width: 1240px;
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

	&__creatives-item {
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