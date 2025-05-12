<template>
	<div class="creative-card">
		<Image
			v-if="creative.expand?.preview"
			class="creative-card__preview"
			:src="creative.expand.preview"
		/>
		
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

		<div class="creative-card__info">
			<div class="creative-card__price">
				{{ creative.price }}$
			</div>

			<div
				v-if="canBuy"
				class="creative-card__action"
			>
				Купить
			</div>
			<router-link
				v-else
				:to="`/creative/${creative.id}`"
				class="creative-card__action"
			>
				Подробнее
			</router-link>
		</div>

		<div class="creative-card__fade"/>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { User } from '@/components/blocks'
import { Icon } from '@/components/elements'
import { emptyUser } from '@/interfaces/User.ts'
import { ICreative } from '@/interfaces/Creative.ts'
import Image from '@/components/elements/image.vue'

defineProps({
	creative: {
		type: Object as PropType<ICreative>,
		required: true
	},
	canBuy: {
		type: Boolean,
		default: false
	}
})
</script>

<style scoped lang="scss">
.creative-card {
	max-width: 400px;

	position: relative;

	padding: 16px 8px;
	overflow: hidden;

	background: #0F0F10;
	border: 1px solid #1D1D20;
	border-radius: 16px;

	&__user,
	&__info {
		position: relative;
		z-index: 2;
	}

	&__preview {
		position: relative;
		z-index: 1;

		width: 100%;
		max-width: 100%;

		border-radius: 10px;
		object-fit: cover;
		aspect-ratio: 1 / 1;
	}

	&__user {
		display: flex;
		justify-content: space-between;
		align-items: center;

		margin: -37px 10px 0 10px;
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
		width: 160px;

		text-align: center;

		background: #525252;
	}

	&__fade {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 1;

		width: 100%;
		height: 200px;

		background: linear-gradient(to top, rgba(15, 15, 16, 1) 80px, transparent);
	}
}
</style>