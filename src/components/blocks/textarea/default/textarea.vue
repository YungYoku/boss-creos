<template>
	<div class="textarea">
		<Label
			v-if="label"
			:active="!isEmpty"
		>
			{{ label }}
		</Label>

		<textarea
			v-model="value"
			class="textarea__field"
			:class="[{
				'_empty': value.length === 0
			}]"
			:style="{
				height
			}"
			:disabled
		/>

		<span
			v-if="error"
			class="textarea__error"
		>
			{{ error }}
		</span>

		<Icon
			v-else-if="filled && !disabled"
			class="textarea__clear"
			name="close"
			size="s"
			@click.prevent.stop="clear"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Icon, Label } from '@/components/elements'

import type { Props } from './props'
import { defaultProps } from './props'

withDefaults(defineProps<Props>(), defaultProps)

const value = defineModel<string>({
	type: String,
	default: ''
})
const clear = () => value.value = ''

const isEmpty = computed(() => {
	if (typeof value.value === 'number') {
		return false
	} else if (typeof value.value === 'string') {
		return value.value.length === 0
	}

	return true
})

const filled = computed(() => value.value.length > 0)
</script>

<style scoped>
.textarea {
	position: relative;

	.textarea__field {
		width: 100%;
		padding: 16px 12px 8px;
		font-size: 14px;
		font-weight: 300;
		background: hsl(var(--background));
		border: 1px solid hsl(var(--input));
		border-radius: 14px;
		outline: none;
		transition: all 0.2s, padding 0s;
		resize: none;

		&._empty {
			padding-top: 8px;
		}

		&:focus-visible {
			border-color: rgb(245 245 244 / 100%);
		}

		&:hover {
			background: hsl(var(--accent));
		}

		&:disabled {
			opacity: 0.5;
		}
	}

	.textarea__error {
		padding-left: 12px;
		font-size: 12px;
		font-weight: 200;
		color: hsl(var(--destructive));
	}

	.textarea__clear {
		position: absolute;
		top: 14px;
		right: 12px;
		cursor: pointer;
	}
}
</style>