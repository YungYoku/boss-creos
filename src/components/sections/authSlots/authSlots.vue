<template>
	<div class="auth-slots">
		<div
			v-for="(column, colIndex) in columns"
			:key="colIndex"
			class="auth-slots__column"
		>
			<img
				v-for="(src, index) in column"
				ref="slots"
				:key="index"
				class="auth-slots__slot"
				:src="src"
				alt=""
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import image from '@/assets/img/slot.webp'

const columns = [
	Array(7).fill(image),
	Array(7).fill(image),
	Array(7).fill(image)
]

const slotsRefs = useTemplateRef('slots')
const height = computed(() => {
	if (slotsRefs.value?.[0]) {
		const height: number = slotsRefs.value[0].height
		return `-${(height + 30).toString()}px`
	}
	return '0'
})
</script>

<style scoped>
@keyframes down {
	from {
		transform: translateY(v-bind(height));
	}

	to {
		transform: translateY(0);
	}
}

@keyframes up {
	from {
		transform: translateY(0);
	}

	to {
		transform: translateY(v-bind(height));
	}
}

.auth-slots {
	display: flex;
	height: 100vh;
	max-height: 100vh;
	overflow: hidden;
	gap: 30px;
	margin: -94px 0 0;

	.auth-slots__column {
		height: calc(100% / 6 * 7);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30px;

		&:nth-child(2) {
			margin-top: calc((100% - 150px) / 7);
			animation: up 3s linear infinite;
		}

		animation: down 3s linear infinite;
	}

	.auth-slots__slot {
		max-width: 100%;
		min-height: calc((100% - 150px) / 7);
		max-height: calc((100% - 150px) / 7);
		user-select: none;
		pointer-events: none;
	}
}
</style>
