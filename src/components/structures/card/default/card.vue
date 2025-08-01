<template>
	<div class="card">
		<img
			v-if="badge"
			src="@/assets/img/creative__badge.webp"
			class="card__badge"
			alt=""
		>

		<slot name="video"/>

		<div class="card__fade"/>

		<slot name="footer"/>
	</div>
</template>

<script setup lang="ts">
defineProps({
	badge: {
		type: Boolean,
		default: true
	}
})
</script>

<style scoped lang="scss">
.card {
	position: relative;

	max-width: 400px;
	padding: 16px 8px;

	background: #0F0F10;
	border: 1px solid #1D1D20;
	border-radius: 16px;

	@media (max-width: 1024px) {
		max-width: 300px;
	}

	&__badge {
		position: absolute;
		top: -35px;
		left: calc(50% - 47px);

		width: 95px;
		height: 70px;
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