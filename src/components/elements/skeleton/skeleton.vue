<template>
	<div
		class="skeleton"
		:style="{
			width,
			height
		}"
	/>
</template>

<script setup lang="ts">
interface Props {
	width?: string
	height?: string
}

const { width = '100%', height = '100%' } = defineProps<Props>()
</script>

<style scoped>
@keyframes pulse {
	50% {
		opacity: 0.5;
	}
}

.skeleton {
	max-width: 100%;
	background-color: hsl(var(--primary) / 10%);
	border-radius: 8px;
	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
