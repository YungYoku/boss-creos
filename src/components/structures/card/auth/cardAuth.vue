<template>
	<div
		class="card-auth"
		:style="{
			width
		}"
	>
		<div
			v-if="title"
			class="card-auth__title"
		>
			{{ title }}
		</div>

		<Grid
			vertical
			gap="l"
			class="card-auth__content"
		>
			<slot />
		</Grid>

		<Grid
			v-if="$slots.footer"
			vertical
			class="card-auth__footer"
			gap="xs"
		>
			<slot name="footer" />
		</Grid>
	</div>
</template>

<script setup lang="ts">
import { Grid } from '@/components/structures'

defineEmits(['keyup'])

defineProps({
	width: {
		type: String,
		default: '300px'
	},
	title: {
		type: String,
		default: null
	}
})
</script>

<style scoped>
.card-auth {
	max-width: 100%;

	.card-auth__title {
		padding: 16px 20px 4px;
		font-size: 32px;
		font-weight: 700;
	}

	.card-auth__content {
		padding: 20px;
	}

	.card-auth__footer {
		padding: 0 20px 20px;
	}
}
</style>