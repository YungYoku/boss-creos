<template>
	<div class="main">
		<div class="main__prologue">
			<div class="main__prologue-info">
				<div class="main__prologue-fee">Комиссия 0%</div>

				<div class="main__prologue-text">
					<span>Закажи крео по своему ТЗ</span>
					<span>Или выбери уже готовое прямо сейчас</span>
				</div>

				<div class="main__prologue-buttons">
					<div class="main__prologue-made-creatives-wrap">
						<div class="main__prologue-made-creatives">Готовые крео</div>
					</div>
					<div class="main__prologue-order-from-scratch">Заказать с нуля</div>
				</div>

				<div class="main__prologue-fb-approve">100% аппрув на FB</div>
			</div>

			<div class="main__prologue-creatives">
				<CreativeCard
					v-if="creatives[0]"
					class="main__prologue-creative"
					:creative="creatives[0]"
					:badge="false"
				/>
				<CreativeCard
					v-if="creatives[1]"
					class="main__prologue-creative"
					:creative="creatives[1]"
					:badge="false"
				/>
			</div>
		</div>

		<div v-if="creatives.length || loadingCreatives" class="main__creatives">
			<template v-if="loadingCreatives">
				<EmptyCreativeCard v-for="i in 8" :key="i" class="main__creatives-item" />
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

		<router-link class="main__show-more" to="/shop"> Смотреть ещё </router-link>
	</div>
</template>

<script lang="ts" setup>
import { type Ref, ref } from 'vue'
import type { ICreative, ICreatives } from '@/types/creative'
import { CreativeCard, EmptyCreativeCard } from '@/components/blocks'
import { Http } from '@/plugins'

definePage({
	meta: {
		bgClass: 'home',
	},
})

const loadingCreatives = ref(true)
const creatives: Ref<ICreative[]> = ref([])
const loadCreatives = async () => {
	loadingCreatives.value = true

	await Http.get<ICreatives>('/collections/creatives/records', {
		filter: "status='approved'",
		expand: ['preview', 'video', 'creator', 'creator.avatar'],
		perPage: 12,
	}).then((res) => {
		creatives.value = res.items
	})

	loadingCreatives.value = false
}
void loadCreatives()
</script>

<style scoped>
.main {
	display: flex;
	flex-direction: column;
	padding: 0 0 40px;
	width: 100%;

	.main__prologue {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		min-height: 600px;
		margin: 0 auto;
		gap: 20px;
	}

	.main__prologue-info {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.main__prologue-fee {
		position: absolute;
		top: -60px;
		right: -60px;
		font-size: 15px;
		font-weight: 700;
		color: #f5ff00;
		transform: rotate(20deg);
		cursor: default;
		filter: drop-shadow(0 0 15px rgb(245 255 0 / 60%));
	}

	.main__prologue-text {
		display: flex;
		flex-direction: column;
		margin-bottom: 30px;
		font-weight: 700;

		span:nth-child(1) {
			font-size: 32px;
		}

		span:nth-child(2) {
			font-size: 20px;
		}
	}

	.main__prologue-buttons {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.main__prologue-made-creatives-wrap {
		filter: drop-shadow(0 0 20px rgb(245 255 0 / 60%));
	}

	.main__prologue-made-creatives {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 240px;
		height: 44px;
		font-size: 12px;
		font-weight: 700;
		color: #000;
		text-transform: uppercase;
		background-color: #f5ff00;
		cursor: default;
		clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
	}

	.main__prologue-order-from-scratch {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 180px;
		height: 100px;
		font-size: 12px;
		font-weight: 700;
		background-image: url('@/assets/img/main__order-from-scratch.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		cursor: default;
		filter: drop-shadow(0 0 20px rgb(255 255 255 / 60%));
	}

	.main__prologue-fb-approve {
		position: absolute;
		right: 25%;
		bottom: -70px;
		font-size: 12px;
		font-weight: 700;
		color: #f5ff00;
		text-transform: uppercase;
		transform: rotate(-4deg);
		cursor: default;
		filter: drop-shadow(0 0 15px rgb(245 255 0 / 60%));
	}

	.main__prologue-creatives {
		position: relative;
		width: 50%;
	}

	.main__prologue-creative {
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

	.main__creatives {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		max-width: 100%;
		gap: 20px;
		margin: 120px auto 40px;

		@media (max-width: 1024px) {
			gap: 15px;
		}

		@media (max-width: 600px) {
			gap: 15px;
		}
	}

	.main__creatives-item.creative-card {
		max-width: calc((100% - 40px) / 3);

		@media (max-width: 1024px) {
			max-width: calc((100% - 15px) / 2);
		}

		@media (max-width: 600px) {
			max-width: 100%;
		}
	}

	.main__show-more {
		margin: 0 auto;
	}
}
</style>