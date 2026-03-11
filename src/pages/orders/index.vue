<template>
	<div class="orders">
		<div class="orders__title">Мои заказы</div>

		<span v-if="baskets.length === 0">Пусто</span>

		<CardLong
			v-for="basket in baskets"
			:key="basket.id"
		>
			<template #icon>
				<Image
					v-if="basket.expand?.creative?.expand?.preview"
					class="orders__creative-image"
					:src="basket.expand.creative.expand.preview"
				/>
			</template>

			<div class="orders__creative-content">
				<div class="orders__creative-name">
					<router-link :to="`/creative/${basket.expand?.creative?.id}`">
						{{ basket.expand?.creative?.expand?.slot?.name }} - ${{
							basket.expand?.creative?.price
						}}
					</router-link>

					<div
						class="orders__status"
						:class="{
							_pending: basket.status === 'in-progress',
							_done: basket.status === 'done'
						}"
					/>
				</div>

				<div class="orders__creative-geo">
					Geo:
					<span
						v-for="(geo, index) in basket.expand?.geo"
						:key="geo.id"
						class="orders__creative-geo-item"
					>
						{{ geo.name }}
						<template v-if="index < (basket?.expand?.geo?.length ?? 0) - 1">
							/
						</template>
					</span>
				</div>
			</div>

			<template #action>
				<InputVideo
					v-if="basket.status === 'in-progress'"
					v-model="basket.video"
					compact
					@update:model-value="loadVideo(basket)"
				>
					Загрузить
				</InputVideo>
				<Button
					variant="outline"
					@click="showDescription(basket)"
				>
					Подробнее
				</Button>
			</template>
		</CardLong>
	</div>

	<Modal
		v-if="modalShowing"
		:width="585"
		@close="modalShowing = false"
	>
		<div class="orders__item-description">
			Описание: {{ modalShowingBasket?.comment || 'пусто' }}
		</div>
		<div
			v-if="modalShowingBasket?.resize?.length"
			class="orders__item-resize"
		>
			Ресайз: {{ modalShowingBasket.resize.join(', ') }}
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { computed, ref, type Ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { CardLong, Modal } from '@/components/structures'
import { Image } from '@/components/elements'
import { Http } from '@/plugins'
import type { IBasket, IBaskets } from '@/types/basket'
import type { ICreative, ICreatives } from '@/types/creative'
import { Button, InputVideo } from '@/components/blocks'
import { AUTH } from '@/data/permissions'

definePage({
	meta: {
		permissions: [AUTH],
		bgClass: 'shop'
	}
})

const auth = useAuthStore()
const creatives: Ref<ICreative[]> = ref([])
const creativesIDs = computed(() => creatives.value.map(({ id }) => id))
const loadCreatives = async () => {
	if (!auth.user.id) return

	await Http.get<ICreatives>('/collections/creatives/records', {
		filter: `creator='${auth.user.id}'`
	}).then(({ items }) => {
		creatives.value = items
	})
}

const baskets: Ref<IBasket[]> = ref([])
const loadBaskets = async () => {
	if (creativesIDs.value.length === 0) return

	const filter = creativesIDs.value.map(id => `creative = '${id}'`).join(' || ')
	await Http.get<IBaskets>('/collections/baskets/records', {
		filter,
		expand: ['creative', 'creative.preview', 'creative.slot', 'geo']
	}).then(({ items }) => {
		baskets.value = items
	})
}

watch(
	() => auth.user,
	() => {
		void loadCreatives().then(() => {
			void loadBaskets()
		})
	},
	{ immediate: true }
)

const modalShowing = ref(false)
const modalShowingBasket: Ref<IBasket | null> = ref(null)
const showDescription = (basket: IBasket) => {
	modalShowing.value = true
	modalShowingBasket.value = basket
}

const loadVideo = async (basket: IBasket) => {
	await Http.patch<IBaskets>(`/collections/baskets/records/${basket.id}`, {
		status: 'done',
		video: basket.video
	}).then(() => {
		basket.status = 'done'
	})
}
</script>

<style scoped>
.orders {
	display: flex;
	flex-direction: column;
	gap: 7px;
	width: 860px;
	max-width: 100%;

	.orders__title {
		font-size: 32px;
		font-weight: 700;
		color: #fff;
		text-align: center;
		margin: 100px 0 20px;
	}

	.orders__creative-image {
		min-width: 57px;
		max-width: 57px;
		max-height: 57px;
		aspect-ratio: 1/1;
		border-radius: 10px;
	}

	.orders__creative-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.orders__creative-name {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 8px;
		font-size: 14px;
	}

	.orders__status {
		width: 5px;
		height: 5px;
		border-radius: 50%;

		&._pending {
			background: #fdfd1a;
		}

		&._done {
			background: #18e618;
		}
	}

	.orders__creative-geo {
		font-size: 10px;
		color: #afafb7;
	}

	.orders__creative-geo-item {
		text-transform: uppercase;
	}
}
</style>