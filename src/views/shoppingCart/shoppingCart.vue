<template>
	<div class="shopping-cart">
		<div class="shopping-cart__title">
			Корзина
		</div>

		<div class="shopping-cart__action-panel">
			<BadgeBalance/>
		</div>

		<div class="shopping-cart__content">
			<span v-if="baskets.length === 0">Пусто</span>
			<span v-else>Стоимость ${{ totalPrice }}</span>

			<CardLong
				v-for="basket in baskets"
				:key="basket.id"
				class="shopping-cart__creative"
			>
				<template #icon>
					<Image
						v-if="basket.expand?.creative?.expand?.preview"
						class="shopping-cart__creative-image"
						:src="basket.expand.creative.expand.preview"
					/>
				</template>

				<div class="shopping-cart__creative-info">
					<router-link
						:to="`/creative/${basket.expand?.creative?.id}`"
						class="shopping-cart__creative-name"
					>
						{{ basket.expand?.creative?.expand?.slot?.name }}
					</router-link>

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

				<template #action>
					<button
						class="shopping-cart__creative-remove"
						@click="removeShoppingCart(basket.id)"
					>
						Удалить
					</button>

					<router-link
						:to="`/shopping-cart/edit/${basket.id}`"
						class="shopping-cart__creative-edit"
					>
						Ред
					</router-link>
				</template>
			</CardLong>

			<Button
				v-if="totalPrice > 0"
				class="shopping-cart__pay"
				variant="outline"
				@click="pay"
			>
				Оплатить
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { CardLong } from '@/components/structures'
import { Button } from '@/components/blocks'
import { BadgeBalance, Image } from '@/components/elements'
import { Http } from '@/plugins'
import type { IUser } from '@/types/user'
import { useToast } from '@/stores/toast'

const auth = useAuthStore()

const baskets = computed(() => {
	const baskets = auth.user.expand?.baskets ?? []
	return baskets.filter(basket => basket.status === 'created')
})

const totalPrice = computed(() => {
	return baskets.value.reduce((acc, cur) => {
		const creative = cur.expand?.creative
		const geo = cur.geo.length
		return acc + (creative?.price ?? 0) * geo
	}, 0)
})

const toast = useToast()
const router = useRouter()
const pay = async () => {
	if (auth.user.balance < totalPrice.value) {
		toast.set('Недостаточно средств!')
	} else {
		await Http.post<IUser>('/baskets/pay')
			.then(async data => {
				auth.setUser(data)
				await router.push('/bought')
			})
	}
}

const removeShoppingCart = async (id: string) => {
	const newBaskets = auth.user.baskets.filter(basket => basket !== id)
	await Http.patch<IUser>(`/collections/users/records/${auth.user.id}`, {
		...auth.user,
		baskets: newBaskets
	}, {
		expand: ['baskets', 'baskets.creative', 'baskets.creative.preview', 'baskets.creative.slot', 'baskets.geo', 'transactions']
	}).then(data => {
		auth.setUser(data)
	})

	await Http.delete(`/collections/baskets/records/${id}`)
}
</script>

<style scoped lang="scss">
.shopping-cart {
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 800px;
	max-width: 100%;

	&__title {
		font-size: 32px;
		font-weight: 700;
		color: #fff;
		text-align: center;
	}

	&__action-panel {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	&__content {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		padding: 24px 15px;
		background: linear-gradient(180deg, rgb(255 255 255 / 10%) 0%, rgb(255 255 255 / 8%) 100%),
		radial-gradient(50% 100% at 50% 0%, rgb(255 255 255 / 10%) 0%, rgb(255 255 255 / 0%) 100%);
		border: 1px solid;
		border-radius: 10px;
		border-image-source: linear-gradient(135.28deg, rgb(255 255 255 / 30%) -128.53%, rgb(255 255 255 / 0%) 75.12%);
	}

	&__creative {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 15px 0 0;
	}

	&__creative-image {
		min-width: 57px;
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
		line-height: 1;
		margin-bottom: 5px;
	}

	&__creative-price,
	&__creative-geo {
		font-size: 10px;
		color: #AFAFB7;
		line-height: 1;
	}

	&__creative-geo-item {
		text-transform: uppercase;
	}

	&__creative-remove,
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
		cursor: pointer;
	}

	&__pay {
		margin: 0 auto;
	}
}
</style>