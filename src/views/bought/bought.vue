<template>
	Мои заказы
	<div class="shopping-cart">
		<span v-if="baskets.length === 0">Пусто</span>

		<CardLong
			v-for="basket in baskets"
			:key="basket.id"
		>
			<template #icon>
				<Image
					v-if="basket.expand?.creative?.expand?.preview"
					class="shopping-cart__creative-image"
					:src="basket.expand.creative.expand.preview"
				/>
			</template>

			<div class="shopping-cart__creative-name">
				{{ basket.expand?.creative?.expand?.slot?.name }}

				<div
					class="shopping-cart__status"
					:class="{
						_pending: basket.status === 'pending',
						_done: basket.status === 'done',
					}"
				/>
			</div>

			<div class="shopping-cart__creative-price">
				Price: ${{ basket.expand?.creative?.price }}
			</div>

			<div class="shopping-cart__creative-geo">
				Geo:
				<span
					v-for="(geo, index) in basket.expand?.geo"
					:key="geo.id"
					class="shopping-cart__creative-geo-item"
				>
					{{ geo.name }}
					<template v-if="index < (basket?.expand?.geo?.length ?? 0) - 1">
						/
					</template>
				</span>
			</div>
		</CardLong>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { CardLong } from '@/components/structures'
import { Image } from '@/components/elements'

const auth = useAuthStore()

const baskets = computed(() => {
	const baskets = auth.user.expand?.baskets ?? []
	return baskets.filter(basket => basket.status !== 'created')
})
</script>

<style scoped lang="scss">
.shopping-cart {
	display: flex;
	flex-direction: column;
	gap: 20px;

	width: 800px;
	max-width: 100%;
	padding: 24px 15px;

	background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.08) 100%),
	radial-gradient(50% 100% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	border: 1px solid;
	border-radius: 10px;
	border-image-source: linear-gradient(135.28deg, rgba(255, 255, 255, 0.3) -128.53%, rgba(255, 255, 255, 0) 75.12%);

	&__creative-image {
		min-width: 57px;
		max-width: 57px;
		max-height: 57px;
		aspect-ratio: 1/1;

		border-radius: 10px;
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
			background: yellow;
		}

		&._done {
			background: green;
		}
	}

	&__creative-price,
	&__creative-geo {
		font-size: 10px;
		color: #AFAFB7;
	}

	&__creative-geo-item {
		text-transform: uppercase;
	}
}
</style>