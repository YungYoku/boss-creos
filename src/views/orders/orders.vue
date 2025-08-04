<template>
	<div class="orders">
		<div class="orders__title">
			Мои заказы
		</div>

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
						{{ basket.expand?.creative?.expand?.slot?.name }} - ${{ basket.expand?.creative?.price }}
					</router-link>

					<div
						class="orders__status"
						:class="{
							_pending: basket.status === 'pending',
							_done: basket.status === 'done',
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
		</CardLong>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, Ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { CardLong } from '@/components/structures'
import { Image } from '@/components/elements'
import { Http } from '@/plugins'
import { IBasket, IBaskets } from '@/interfaces/Basket.ts'
import { ICreative, ICreatives } from '@/interfaces/Creative.ts'

const auth = useAuthStore()
const creatives: Ref<Array<ICreative>> = ref([])
const creativesIDs = computed(() => creatives.value.map(({ id }) => id))
const loadCreatives = async () => {
	if (!auth.user.id) return

	await Http.get<ICreatives>('/collections/creatives/records', {
		filter: `creator='${auth.user.id}'`,
	})
		.then(({ items }) => {
			creatives.value = items
		})
}

const baskets: Ref<Array<IBasket>> = ref([])
const loadBaskets = async () => {
	if (creativesIDs.value.length === 0) return

	const filter = creativesIDs.value.map(id => `creative = '${id}'`).join(' || ')
	await Http.get<IBaskets>('/collections/baskets/records', {
		filter,
		expand: ['creative', 'creative.preview', 'creative.slot', 'geo']
	})
		.then(({ items }) => {
			baskets.value = items
		})
}

watch(() => auth.user, () => {
	loadCreatives().then(() => {
		loadBaskets()
	})
}, { immediate: true })
</script>

<style scoped lang="scss">
.orders {
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