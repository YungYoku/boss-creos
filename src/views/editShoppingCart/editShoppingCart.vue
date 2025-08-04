<template>
	Корзина - редактирование
	<div class="edit-shopping-cart">
		<span v-if="user.user.baskets.length === 0">Пусто</span>

		<div
			v-for="basket in user.user.expand?.baskets"
			:key="basket.id"
			class="edit-shopping-cart__creative"
		>
			<div class="edit-shopping-cart__creative-head">
				<Image
					v-if="basket.expand?.creative?.expand?.preview"
					class="edit-shopping-cart__creative-image"
					:src="basket.expand.creative.expand.preview"
				/>

				<div class="edit-shopping-cart__creative-info">
					<div class="edit-shopping-cart__creative-name">
						{{ basket.expand?.creative?.expand?.slot?.name }}
					</div>

					<div class="edit-shopping-cart__creative-geo">
						Geo:
						<span
							v-for="(geo, index) in basket.expand?.geo"
							:key="geo.id"
							class="edit-shopping-cart__creative-geo-item"
						>
							{{ geo.name }}
							<template v-if="index < (basket?.expand?.geo?.length ?? 0) - 1">
								/
							</template>
						</span>
					</div>
				</div>
			</div>

			<Select
				v-if="basket.expand?.creative?.resize"
				v-model="basket.resize"
				multiple
				:items="ratioItems"
				label="Ресайз"
			/>

			<Checkbox
				v-if="basket.expand?.creative?.reskin"
				v-model="basket.reskin"
				label="Рескин"
			/>

			<Textarea
				v-model="basket.comment"
				class="edit-shopping-cart__creative-description"
				label="Описание"
			/>

			<Button
				class="edit-shopping-cart__creative-edit"
				@click="updateBasket(basket)"
			>
				Сохранить
			</Button>
		</div>

		<Button to="/shopping-cart">
			Вернуться
		</Button>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'
import { Button, Checkbox, Select, Textarea } from '@/components/blocks'
import { Image } from '@/components/elements'
import { IBasket } from '@/types/Basket.ts'
import { ratioItems } from '@/types/Creative.ts'
import { Http } from '@/plugins'

const user = useAuthStore()

const updateBasket = async (basket: IBasket) => {
	await Http
		.patch<IBasket>(`/collections/baskets/records/${basket.id}`, basket)
		.then(() => {
		})
}
</script>

<style scoped lang="scss">
.edit-shopping-cart {
	display: flex;
	flex-direction: column;
	gap: 20px;

	width: 800px;
	max-width: 100%;

	&__creative {
		display: flex;
		flex-direction: column;
		gap: 5px;

		padding: 5px;

		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.08) 100%),
		radial-gradient(50% 100% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
		border: 1px solid;
		border-radius: 10px;
		border-image-source: linear-gradient(135.28deg, rgba(255, 255, 255, 0.3) -128.53%, rgba(255, 255, 255, 0) 75.12%);
	}

	&__creative-head {
		display: flex;
		align-items: center;

		width: 100%;
		padding: 0 15px 0 0;

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

	&__creative-geo {
		font-size: 10px;
		color: #AFAFB7;
	}

	&__creative-geo-item {
		text-transform: uppercase;
	}

	&__creative-description {
		width: 100%;
	}

	&__creative-edit {
		width: 84px;
		height: 30px;

		font-size: 11px;
		color: #9297A0;

		background: transparent;
		border: 1px solid #FFFFFF1A;
		border-radius: 8px;
	}
}
</style>