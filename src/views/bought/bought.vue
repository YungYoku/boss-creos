<template>
	<div class="bought">
		<div class="bought__title">
			Мои заказы
		</div>

		<div class="bought__action-panel">
			<div class="bought__filters">
				<Badge
					v-for="filter in filters"
					:key="filter.value"
					class="bought__filter"
					:class="{
						_passive: activeFilter !== null && activeFilter !== filter.value,
					}"
					@click="toggleFilter(filter.value)"
				>
					<div
						class="bought__filter-status"
						:class="[`_${filter.value}`]"
					/>
					{{ filter.name }}
				</Badge>
			</div>
			
			<BadgeBalance/>
		</div>

		<span v-if="baskets.length === 0">Пусто</span>

		<CardLong
			v-for="basket in baskets"
			:key="basket.id"
		>
			<template #icon>
				<Image
					v-if="basket.expand?.creative?.expand?.preview"
					class="bought__creative-image"
					:src="basket.expand.creative.expand.preview"
				/>
			</template>

			<div class="bought__creative-content">
				<div class="bought__creative-name">
					<router-link :to="`/creative/${basket.expand?.creative?.id}`">
						{{ basket.expand?.creative?.expand?.slot?.name }} - ${{ basket.expand?.creative?.price }}
					</router-link>

					<div
						class="bought__status"
						:class="{
							_pending: basket.status === 'in-progress',
							_done: basket.status === 'done'
						}"
					/>
				</div>

				<div class="bought__creative-geo">
					Geo:
					<span
						v-for="(geo, index) in basket.expand?.geo"
						:key="geo.id"
						class="bought__creative-geo-item"
					>
						{{ geo.name }}
						<template v-if="index < (basket?.expand?.geo?.length ?? 0) - 1">
							/
						</template>
					</span>
				</div>
			</div>

			<template #action>
				<Button
					v-if="basket.status === 'done'"
					variant="outline"
					@click="downloadVideo(basket)"
				>
					Скачать
				</Button>
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
		Описание: {{ modalShowingBasket?.comment || 'пусто' }}
	</Modal>
</template>

<script setup lang="ts">
import { computed, type Ref, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { CardLong, Modal } from '@/components/structures'
import { Badge, BadgeBalance, Image } from '@/components/elements'
import { Button } from '@/components/blocks'
import type { BasketStatus, IBasket } from '@/types/basket'

type Filter = {
	value: BasketStatus
	name: string
}
type Filters = Array<Filter>
const filters: Filters = [
	{
		value: 'done',
		name: 'Выполненные',
	},
	{
		value: 'in-progress',
		name: 'В работе',
	},
] as const
const activeFilter: Ref<BasketStatus | null> = ref(null)
const toggleFilter = (value: BasketStatus) => {
	if (activeFilter.value === value) {
		activeFilter.value = null
	} else {
		activeFilter.value = value
	}
}

const auth = useAuthStore()

const baskets = computed(() => {
	const baskets = auth.user.expand?.baskets ?? []
	return baskets
		.filter(basket => basket.status !== 'created')
		.filter(basket => {
			if (activeFilter.value !== null) {
				return basket.status === activeFilter.value
			}
			return true
		})
})

const modalShowing = ref(false)
const modalShowingBasket: Ref<IBasket | null> = ref(null)
const showDescription = (basket: IBasket) => {
	modalShowing.value = true
	modalShowingBasket.value = basket
}

const downloadVideo = (basket: IBasket) => {
	const file = basket.expand?.video
	if (!file) return

	window.open(`${import.meta.env.VITE_API}/files/${file.collectionId}/${file.id}/${file.original_video}`, '_blank')
}
</script>

<style scoped lang="scss">
.bought {
	display: flex;
	flex-direction: column;
	gap: 7px;

	width: 860px;
	max-width: 100%;

	&__title {
		font-size: 32px;
		font-weight: 700;
		color: #ffffff;
		text-align: center;
		margin: 100px 0 20px 0;
	}

	&__action-panel {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;

		margin-bottom: 20px;
	}

	&__filters {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	&__filter {
		transition: all 0.2s;

		&._passive {
			opacity: 0.6;
			transition: all 0.2s;
		}
	}

	&__filter-status {
		width: 5px;
		height: 5px;
		border-radius: 50%;

		&._in-progress {
			background: #fdfd1a;
		}

		&._done {
			background: #18e618;
		}
	}

	&__creative-image {
		min-width: 57px;
		max-width: 57px;
		max-height: 57px;
		aspect-ratio: 1/1;

		border-radius: 10px;
	}

	&__creative-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	&__creative-name {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 8px;

		font-size: 14px;
	}

	&__status {
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

	&__creative-geo {
		font-size: 10px;
		color: #AFAFB7;
	}

	&__creative-geo-item {
		text-transform: uppercase;
	}
}
</style>