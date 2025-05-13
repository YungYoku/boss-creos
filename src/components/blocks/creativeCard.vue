<template>
	<div class="creative-card">
		<Image
			v-if="creative.expand?.preview"
			class="creative-card__preview"
			:src="creative.expand.preview"
		/>

		<div class="creative-card__fade"/>

		<div class="creative-card__user">
			<User
				link
				:user="creative.expand?.creator ?? emptyUser"
			/>

			<Icon
				name="heart"
				size="m"
			/>
		</div>

		<SelectLive
			v-if="forSale"
			v-model="geo"
			class="creative-card__select-geo"
			label="Указать гео"
			api="geo"
			multiple
		/>

		<div class="creative-card__info">
			<div class="creative-card__price">
				{{ creative.price }}$
			</div>

			<button
				v-if="forSale"
				class="creative-card__action"
				@click="addToBasket"
			>
				Купить
			</button>
			<router-link
				v-else
				:to="`/creative/${creative.id}`"
				class="creative-card__action"
			>
				Подробнее
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'
import { User, SelectLive } from '@/components/blocks'
import { Icon, Image } from '@/components/elements'
import { emptyUser } from '@/interfaces/User.ts'
import { ICreative } from '@/interfaces/Creative.ts'
import { Http } from '@/plugins'

const props = defineProps({
	creative: {
		type: Object as PropType<ICreative>,
		required: true
	},
	forSale: {
		type: Boolean,
		default: false
	}
})

const geo = ref([])

const addToBasket = async () => {
	await Http.post('/baskets/add', {
		creative: props.creative?.id,
		geo: [...geo.value]
	})
}
</script>

<style scoped lang="scss">
.creative-card {
	max-width: 400px;
	padding: 16px 8px;

	background: #0F0F10;
	border: 1px solid #1D1D20;
	border-radius: 16px;

	&__preview {
		width: 100%;
		max-width: 100%;

		background: linear-gradient(to top, rgba(15, 15, 16, 1) 80px, transparent);
		border-radius: 10px;
		object-fit: cover;
		aspect-ratio: 1 / 1;
	}

	&__user {
		position: relative;
		z-index: 2;

		display: flex;
		justify-content: space-between;
		align-items: center;

		margin: -40px 10px 15px 10px;
	}

	&__select-geo {
		margin-bottom: 5px;
	}
	
	&__info {
		display: flex;
		justify-content: center;
		align-items: center;

		max-width: 220px;
		margin: 0 auto;

		color: #fff;

		background: #303036;
		border: 1px solid #27272B;
	}

	&__info,
	&__action {
		border-radius: 14px;
	}

	&__price,
	&__action {
		padding: 12px;
	}

	&__action {
		width: 158px;

		text-align: center;

		background: #525252;
	}

	&__fade {
		position: relative;
		z-index: 1;

		width: 100%;
		height: 80px;
		margin: -80px 0 0 0;

		background: linear-gradient(to top, rgba(15, 15, 16, 1) 5px, transparent);
	}
}
</style>