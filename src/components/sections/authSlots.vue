<template>
	<div class="auth-slots">
		<div
			v-for="column in 3"
			:key="`column-${column}`"
			class="auth-slots__column"
		>
			<img
				v-for="slot in 5"
				:key="`slot-${slot}`"
				class="auth-slots__slot"
				src="@/assets/img/slot.webp"
				alt=""
			>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.auth-slots {
	display: flex;

	width: 640px;
	min-width: 640px;
	height: 100vh;
	max-height: 100vh;
	overflow: hidden;
	gap: 20px;

	&__column {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	&__slot {
		max-width: 200px;
	}
}
</style>