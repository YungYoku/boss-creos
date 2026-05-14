<template>
	<div
		class="badge"
		@click="emit('click')"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<style scoped>
.badge {
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 4px 10px;
	font-weight: 600;
	font-size: 13px;
	border-radius: 16px;
	border: 1px solid #1d1d20;
	background: #0f0f10;
	cursor: pointer;
	user-select: none;
}
</style>