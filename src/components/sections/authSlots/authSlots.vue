<template>
	<div class="auth-slots">
		<div
			v-for="column in columns"
			:key="`column-${column}`"
			class="auth-slots__column"
		>
			<img
				v-for="slot in column"
				ref="slots"
				:key="`slot-${slot}`"
				class="auth-slots__slot"
				:src="slot.image"
				alt=""
			>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, useTemplateRef } from 'vue'
import image from '@/assets/img/slot.webp'

const slotsRefs = useTemplateRef('slots')
const slotBase = {
	image
}
const columns = reactive([
	[slotBase, slotBase, slotBase, slotBase, slotBase, slotBase, slotBase],
	[slotBase, slotBase, slotBase, slotBase, slotBase, slotBase, slotBase],
	[slotBase, slotBase, slotBase, slotBase, slotBase, slotBase, slotBase],
])

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