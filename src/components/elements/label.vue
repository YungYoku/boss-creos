<template>
	<div
		class="label"
		:class="{ '_active': active }"
	>
		<slot/>
	</div>
</template>

<script setup lang="ts">
defineProps({
	active: {
		type: Boolean,
		default: false
	}
})
</script>

<style scoped lang="scss">
.label {
	position: absolute;
	top: 13px;
	left: 12px;

	font-size: 14px;
	font-weight: 300;
	color: hsl(var(--muted-foreground));

	transition: all 0.1s linear;

	user-select: none;
	pointer-events: none;

	&._active {
		top: 4px;
		left: 12px;

		font-size: 12px;
		font-weight: 200;

		transition: all 0.1s linear;
	}
}
</style>