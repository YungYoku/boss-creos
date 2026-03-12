<template>
	<div class="card">
		<img
			v-if="badge"
			src="@/assets/img/creative__badge.webp"
			class="card__badge"
			alt=""
		/>

		<slot name="image" />

		<div class="card__fade" />

		<slot name="footer" />
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

<style scoped>
.card {
	position: relative;
	padding: 16px 8px;
	background: #0f0f10;
	border: 1px solid #1d1d20;
	border-radius: 16px;

	@media (max-width: 1024px) {
		max-width: 300px;
	}

	.card__badge {
		position: absolute;
		top: -35px;
		left: calc(50% - 47px);
		width: 95px;
		height: 70px;
	}

	.card__fade {
		position: relative;
		z-index: 1;
		width: 100%;
		height: 80px;
		margin: -80px 0 0;
		background: linear-gradient(to top, rgb(15 15 16 / 100%) 5px, transparent);
		pointer-events: none;
	}
}
</style>