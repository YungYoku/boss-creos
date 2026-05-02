<template>
	<div
		class="switcher"
		@click="toggle"
	>
		<div
			v-if="label"
			class="switcher__label"
		>
			{{ label }}
		</div>

		<div
			class="switcher__content"
			:class="{
				_active: isActive
			}"
		>
			<div
				class="switcher__content-icon"
				:class="{
					_active: isActive
				}"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { Props } from './props'
import { defaultProps } from './props'

const props = withDefaults(defineProps<Props>(), defaultProps)

const value = defineModel<boolean>({
	default: null
})

const toggle = () => {
	value.value = !value.value
}

const isActive = computed(() => {
	return value.value ?? props.checked
})
</script>

<style scoped>
.switcher {
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;

	.switcher__label {
		font-weight: 300;
		text-align: left;
	}

	.switcher__content {
		width: 80px;
		height: 25px;
		padding: 4px 8px;
		background: hsl(var(--background));
		border: 1px solid hsl(var(--input));
		border-radius: 8px;

		&._active {
			background: var(--active);
		}
	}

	.switcher__content-icon {
		width: 15px;
		height: 15px;
		margin: 0 calc(100% - 24px) 0 0;
		background: #fff;
		border-radius: 6px;

		&._active {
			margin: 0 0 0 calc(100% - 15px);
		}
	}
}
</style>