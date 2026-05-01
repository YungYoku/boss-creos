<template>
	<div class="input">
		<Skeleton
			v-if="loading"
			height="48px"
		/>

		<template v-else>
			<Label
				v-if="label"
				:active="!isEmpty"
			>
				{{ label }}
			</Label>

			<div
				class="input__field-wrap"
				:class="[
					variant,
					{
						_disabled: disabled
					}
				]"
			>
				<div
					v-if="type === 'file' && fileName"
					class="input__file-name"
				>
					{{ fileName }}
				</div>

				<input
					v-model="value"
					class="input__field"
					:class="[
						{
							_transparent: transparent
						}
					]"
					:style="{
						cursor
					}"
					:disabled
					:type
					:accept
					autocomplete="off"
					@input="onInput"
				/>
			</div>

			<span
				v-if="error"
				class="input__error"
			>
				{{ error }}
			</span>

			<Icon
				v-if="icon"
				class="input__action"
				:name="icon"
				@click="action"
			/>

			<Icon
				v-else-if="clearable && filled"
				class="input__clear"
				name="close"
				size="s"
				@click.prevent.stop="clear"
			/>
		</template>
	</div>
</template>

<script setup lang="ts" generic="T extends string | number | null">
import { computed, ref } from 'vue'

import { Icon, Label, Skeleton } from '@/components/elements'

import type { Props } from './props'
import { defaultProps } from './props'

const props = withDefaults(defineProps<Props>(), defaultProps)

const value = defineModel<T>({
	default: null,
	required: true
})

const clear = () => {
	if (typeof value.value === 'string') {
		value.value = '' as T
	} else {
		value.value = null as T
	}
	fileName.value = ''
	emit('clear')
}

const fileName = ref('')

const emit = defineEmits(['keyup', 'update-file', 'input', 'action', 'clear'])
const onInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	if (props.type === 'file') {
		const file = target.files?.[0]
		fileName.value = file?.name ?? ''
		if (file) emit('update-file', file)
	} else emit('input', target.value)
}
const action = () => {
	emit('action')
}

const isEmpty = computed(() => {
	if (typeof value.value === 'number') {
		return false
	} else if (typeof value.value === 'string') {
		return value.value.length === 0
	}

	return true
})

const filled = computed(() => {
	if (typeof value.value === 'number') return true
	if (typeof value.value === 'string') return value.value.length > 0
	return false
})
</script>

<style scoped>
.input {
	position: relative;

	.input__field-wrap {
		width: 100%;
		height: 48px;
		background: hsl(var(--background));
		border: 1px solid hsl(var(--input));
		border-radius: 14px;
		outline: none;
		transition: all 0.2s;

		&:focus-visible {
			border-color: rgb(245 245 244 / 100%);
		}

		&.plain {
			border: initial;
			border-radius: initial;

			&:focus-visible {
				border-color: initial;
			}
		}

		&:hover {
			background: hsl(var(--accent));
		}

		&._disabled {
			opacity: 0.5;
		}
	}

	.input__file-name,
	.input__field {
		width: 100%;
		height: 100%;
		padding: 20px 40px 8px 12px;
		font-size: 14px;
		font-weight: 400;
		background: transparent;
		border: none;
		border-radius: 14px;
		outline: none;

		&._transparent {
			opacity: 0;
		}
	}

	.input__error {
		padding-left: 12px;
		font-size: 12px;
		font-weight: 200;
		color: hsl(var(--destructive));
	}

	.input__action,
	.input__clear {
		position: absolute;
		top: 14px;
		right: 12px;
		cursor: pointer;
	}
}
</style>