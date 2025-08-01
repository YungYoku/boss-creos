<template>
	<div class="card-long">
		<div
			v-if="$slots.icon"
			class="card-long__icon"
		>
			<slot name="icon"/>
		</div>

		<div
			v-if="$slots.default"
			class="card-long__content"
		>
			<slot/>
		</div>

		<div
			v-if="$slots.action"
			class="card-long__action"
		>
			<slot name="action"/>
		</div>
	</div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.card-long {
	width: 100%;
	
	display: flex;
	align-items: center;

	padding: 0 15px 0 0;

	background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.08) 100%),
	radial-gradient(50% 100% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	border: 1px solid;
	border-radius: 10px;
	border-image-source: linear-gradient(135.28deg, rgba(255, 255, 255, 0.3) -128.53%, rgba(255, 255, 255, 0) 75.12%);
	gap: 12px;

	&__icon {
		display: flex;
	}

	&__content {
		display: flex;
		flex-direction: column;
	}
}
</style>