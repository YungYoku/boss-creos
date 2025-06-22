<template>
	<div class="shopping-cart">
		<span v-if="user.user.baskets.length === 0">Пусто</span>

		<div
			v-for="basket in user.user.expand?.baskets"
			:key="basket.id"
			class="shopping-cart__creative"
		>
			<Image
				v-if="basket.expand?.creative?.expand?.preview"
				class="shopping-cart__creative-image"
				:src="basket.expand.creative.expand.preview"
			/>

			<div class="shopping-cart__creative-info">
				<div class="shopping-cart__creative-name">
					{{ basket.expand?.creative?.expand?.slot?.name }}
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
			</div>

			<router-link
				to="/shopping-cart/edit"
				class="shopping-cart__creative-edit"
			>
				Ред
			</router-link>
		</div>

		<Button
			v-if="totalPrice > 0"
			class="shopping-cart__pay"
		>
			Оплатить ${{ totalPrice }}
		</Button>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { Button } from '@/components/blocks'
import { Image } from '@/components/elements'

const user = useAuthStore()

const totalPrice = computed(() => {
	const baskets = user.user.expand?.baskets
	if (baskets == null) return 0

	return baskets.reduce((acc, cur) => {
		const creative = cur.expand?.creative
		const geo = cur.geo?.length ?? 0
		return acc + (creative?.price ?? 0) * geo
	}, 0)
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

	&__creative {
		display: flex;
		align-items: center;

		width: 100%;
		padding: 0 15px 0 0;

		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.08) 100%),
		radial-gradient(50% 100% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
		border: 1px solid;
		border-radius: 10px;
		border-image-source: linear-gradient(135.28deg, rgba(255, 255, 255, 0.3) -128.53%, rgba(255, 255, 255, 0) 75.12%);
		gap: 12px;
	}

	&__creative-image {
		max-width: 57px;
		max-height: 57px;
		aspect-ratio: 1/1;

		border-radius: 10px;
	}

	&__creative-info {
		display: flex;
		flex-direction: column;
	}

	&__creative-name {
		font-size: 14px;
	}

	&__creative-price,
	&__creative-geo {
		font-size: 10px;
		color: #AFAFB7;
	}

	&__creative-geo-item {
		text-transform: uppercase;
	}

	&__creative-edit {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 84px;
		height: 30px;
		margin-left: auto;

		font-size: 11px;
		color: #9297A0;

		background: transparent;
		border: 1px solid #FFFFFF1A;
		border-radius: 8px;
	}

	&__pay {
		margin: 0 auto;
	}
}
</style>