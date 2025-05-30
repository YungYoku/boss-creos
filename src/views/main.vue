<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
		class="main"
	>
		<div class="main__prologue">
			<div class="main__prologue-info">
				<div class="main__prologue-fee">
					Комиссия 0%
				</div>

				<div class="main__prologue-text">
					<span>Закажи крео по своему ТЗ</span>
					<span>Или выбери уже готовое прямо сейчас</span>
				</div>

				<div class="main__prologue-buttons">
					<div class="main__prologue-made-creatives-wrap">
						<div class="main__prologue-made-creatives">
							Готовые крео
						</div>
					</div>
					<div class="main__prologue-order-from-scratch">
						Заказать с нуля
					</div>
				</div>

				<div class="main__prologue-fb-approve">
					100% аппрув на FB
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
				class="main__show-more"
				to="/shop"
			>
				Смотреть ещё
			</router-link>
		</div>
	</Grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ICreative, ICreatives } from '@/interfaces/Creative.ts'
import { Grid } from '@/components/structures'
import { CreativeCard, EmptyCreativeCard } from '@/components/blocks'
import { Http } from '@/plugins'

const loadingProject = ref(true)
const creatives = ref<Array<ICreative>>([])
const loadProject = async () => {
	loadingProject.value = true

	await Http
		.get<ICreatives>('/collections/creatives/records', {
			expand: ['preview', 'video', 'creator'],
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
		align-items: center;

		width: 100%;
		min-height: 600px;
		margin: 0 auto;
		gap: 20px;
	}

	&__prologue-info {
		position: relative;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	&__prologue-fee {
		position: absolute;
		top: -60px;
		right: -60px;

		font-size: 15px;
		font-weight: 700;
		color: #F5FF00;

		transform: rotate(20deg);
		cursor: default;
		filter: drop-shadow(0 0 15px rgba(245, 255, 0, 0.6));
	}

	&__prologue-text {
		display: flex;
		flex-direction: column;

		margin-bottom: 56px;

		font-weight: 700;

		span:nth-child(1) {
			font-size: 32px;
		}
		span:nth-child(2) {
			font-size: 20px;
		}
	}

	&__prologue-buttons {
		display: flex;
		gap: 45px;
	}

	&__prologue-made-creatives-wrap {
		filter: drop-shadow(0 0 20px rgba(245, 255, 0, 0.6));
	}

	&__prologue-made-creatives {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 240px;
		height: 44px;

		font-size: 12px;
		font-weight: 700;
		color:#000000;
		text-transform: uppercase;

		background-color: #F5FF00;

		cursor: default;

		clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
	}

	&__prologue-order-from-scratch {
		display: flex;
		justify-content: center;
		align-items: center;

		font-size: 12px;
		font-weight: 700;

		cursor: default;
	}

	&__prologue-fb-approve {
		position: absolute;
		right: 25%;
		bottom: -70px;

		font-size: 12px;
		font-weight: 700;
		color: #F5FF00;
		text-transform: uppercase;

		transform: rotate(-4deg);
		cursor: default;
		filter: drop-shadow(0 0 15px rgba(245, 255, 0, 0.6));
	}

	&__prologue-creatives {
		position: relative;

		width: 50%;
	}

	&__prologue-creative {
		&:nth-child(1) {
			margin: 0 0 90px auto;
		}
		&:nth-child(2) {
			position: absolute;
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

	&__creatives-item {
		max-width: calc((100% - 40px) / 3);

		@media (max-width: 1024px) {
			max-width: calc((100% - 15px) / 2);
		}

		@media (max-width: 600px) {
			max-width: 100%;
		}
	}

	&__show-more {
		margin: 0 auto;
	}
}
</style>