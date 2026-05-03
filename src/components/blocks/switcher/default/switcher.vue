<template>
	<div
		class="switcher"
		:class="{
			_disabled: disabled
		}"
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

	<span
		v-if="error"
		class="switcher__error"
	>
		{{ error }}
	</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { Props } from './props'

const { error = null, checked = false, disabled = false, label = '' } = defineProps<Props>()

const value = defineModel<boolean>({
	default: null
})

const toggle = () => {
	if (disabled) return

	value.value = !value.value
}

const isActive = computed(() => {
	return value.value ?? checked
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