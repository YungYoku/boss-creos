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
	padding: 0 10px 0 0;
	background: linear-gradient(180deg, rgb(255 255 255 / 10%) 0%, rgb(255 255 255 / 8%) 100%),
	radial-gradient(50% 100% at 50% 0%, rgb(255 255 255 / 10%) 0%, rgb(255 255 255 / 0%) 100%);
	border: 1px solid;
	border-radius: 10px;
	border-image-source: linear-gradient(135.28deg, rgb(255 255 255 / 30%) -128.53%, rgb(255 255 255 / 0%) 75.12%);
	gap: 7px;

	&__icon {
		display: flex;
	}

	&__content {
		display: flex;
		flex-direction: column;
		padding: 5px;
	}

	&__action {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 5px;
		margin-left: auto;
	}
}
</style>