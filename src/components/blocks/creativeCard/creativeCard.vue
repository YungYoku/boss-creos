<template>
	<Card class="creative-card">
		<template #image>
			<Video
				v-if="creative.expand?.video && creative.expand?.preview"
				class="creative-card__video"
				:src="creative.expand.video"
				:preview="creative.expand.preview"
			/>
		</template>

		<template #footer>
			<div class="creative-card__user">
				<User
					link
					:user="creative.expand?.creator ?? emptyUser"
				/>

				<Icon
					v-if="auth.isBuyer"
					:name="isFavorite ? 'heart-active' : 'heart'"
					size="m"
					@click="toggleFavorite"
				/>
			</div>

			<SelectLive
				v-if="auth.isBuyer && forSale"
				v-model="geo"
				class="creative-card__select-geo"
				label="Указать гео"
				api="geo"
				multiple
				:exclude="excludeGeo"
			/>

			<div class="creative-card__info">
				<div class="creative-card__price">{{ creative.price }}$</div>

				<router-link
					v-if="auth.isGuest && forSale"
					class="creative-card__action"
					to="/login"
				>
					Купить
				</router-link>
				<button
					v-else-if="auth.isBuyer && forSale"
					class="creative-card__action"
					@click="addToBasket"
				>
					Купить
				</button>
				<router-link
					v-else-if="auth.isDesigner && isItMine"
					:to="`/creative/${creative.id}/edit`"
					class="creative-card__action"
				>
					Редактировать
				</router-link>
				<router-link
					v-else-if="!isDetailPage"
					:to="`/creative/${creative.id}`"
					class="creative-card__action"
				>
					Подробнее
				</router-link>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
import { computed, ref, type Ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Card } from '@/components/structures'
import { SelectLive, User } from '@/components/blocks'
import { Icon, Video } from '@/components/elements'
import { emptyUser, type IUser } from '@/types/user'
import type { IBasket } from '@/types/basket'
import type { ICreative } from '@/types/creative'
import { Http } from '@/plugins'

interface Props {
	creative: ICreative
	forSale?: boolean
}

const { creative, forSale = false } = defineProps<Props>()

const excludeGeo = computed(() => creative.unavailableGeo)

const auth = useAuthStore()
const isItMine = computed(() => creative.creator === auth.user.id)

const route = useRoute()
const isDetailPage = computed(() => route.name === '/creative/[id]')

const geo: Ref<string[]> = ref([])
const basketWithCreative = computed(() => {
	const baskets = auth.user.expand?.baskets ?? []
	const basket = baskets.find(basket => basket.expand?.creative?.id === creative.id)
	if (basket?.status === 'created') {
		return basket
	}

	return null
})
watch(
	basketWithCreative,
	() => {
		if (basketWithCreative.value) {
			geo.value = basketWithCreative.value.geo
		}
	},
	{ immediate: true }
)

const router = useRouter()
const updateBasket = async () => {
	if (!basketWithCreative.value) return

	await Http.patch<IBasket>(
		`/collections/baskets/records/${basketWithCreative.value.id}`,
		{
			...basketWithCreative.value,
			geo: [...geo.value]
		},
		{
			expand: ['creative', 'creative.preview', 'creative.slot', 'geo']
		}
	).then(async updatedBasket => {
		const baskets = (auth.user.expand?.baskets ?? []).map(basket => {
			if (basket.id === updatedBasket.id) {
				return updatedBasket
			}
			return basket
		})
		auth.setBaskets(baskets)
		await router.push('/shopping-cart')
	})
}
const addToBasket = async () => {
	if (geo.value.length === 0) return

	if (basketWithCreative.value) {
		await updateBasket()
		return
	}

	await Http.post<IUser>('/baskets/add', {
		creative: creative.id,
		geo: [...geo.value]
	}).then(async data => {
		auth.setUser(data)
		await router.push('/shopping-cart')
	})
}

const toggleFavorite = async () => {
	const id = creative.id
	if (!id) return

	let newFavorite = [...auth.user.favorite]
	if (newFavorite.includes(id)) {
		newFavorite = newFavorite.filter(fav => fav !== id)
	} else {
		newFavorite.push(id)
	}

	await Http.patch<IUser>(`/collections/users/records/${auth.user.id}`, {
		favorite: newFavorite
	}).then(data => {
		auth.setUser(data)
	})
}

const isFavorite = computed(() => {
	return auth.user.favorite.includes(creative.id)
})
</script>

<style scoped>
.creative-card {
	max-width: 378px;

	.creative-card__video {
		width: 100%;
		max-width: 100%;
		border-radius: 10px;
		object-fit: cover;
		aspect-ratio: 1 / 1;
	}

	.creative-card__user {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: -40px 10px 15px;
	}

	.creative-card__select-geo {
		margin-bottom: 5px;
	}

	.creative-card__info {
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 220px;
		margin: 0 auto;
		color: #fff;
		background: #303036;
		border: 1px solid #27272b;
	}

	.creative-card__info,
	.creative-card__action {
		border-radius: 14px;
	}

	.creative-card__price,
	.creative-card__action {
		padding: 12px;
	}

	.creative-card__action {
		width: 100%;
		font-size: 16px;
		text-align: center;
		background: #525252;
	}
}
</style>