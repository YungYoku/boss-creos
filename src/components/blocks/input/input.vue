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
				:class="[variant, {
					'_disabled': disabled
				}]"
			>
				<div
					v-if="type ==='file' && fileName"
					class="input__file-name"
				>
					{{ fileName }}
				</div>

				<input
					v-model="value"
					class="input__field"
					:class="[{
						'_transparent': transparent
					}]"
					:style="{
						cursor
					}"
					:disabled
					:type
					:accept
					autocomplete="off"
					@input="onInput"
				>
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

<script setup lang="ts">
import { computed, ref } from 'vue'

import { Icon, Label, Skeleton } from '@/components/elements'

interface Props {
	error?: string | null
	loading?: boolean
	label?: string
	disabled?: boolean
	type?: 'text' | 'password' | 'email' | 'file' | 'number'
	icon?: string | null
	autocomplete?: 'off' | 'on' | 'new-password' | 'username',
	cursor?: 'text' | 'pointer',
	clearable?: boolean,
	variant?: 'default' | 'plain'
	transparent?: boolean
	accept?: string
}

const props = withDefaults(defineProps<Props>(), {
	error: null,
	loading: false,
	label: '',
	disabled: false,
	type: 'text',
	icon: null,
	autocomplete: 'off',
	cursor: 'text',
	clearable: true,
	variant: 'default',
	transparent: false,
	accept: ''
})

const value = defineModel<string | number>({
	type: [String, Number],
	default: ''
})
const clear = () => {
	value.value = ''
	fileName.value = ''
}

const fileName = ref('')

const emit = defineEmits(['update-file', 'input', 'action'])
const onInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	if (props.type === 'file') {
		const file = target.files?.[0]
		fileName.value = file?.name ?? ''
		if (file) emit('update-file', file)
	} else emit('input', target.value)
}
const action = () => emit('action')

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

<style scoped lang="scss">
.input {
	position: relative;

	&__field-wrap {
		width: 100%;
		height: 48px;

		background: hsl(var(--background));
		border: 1px solid hsl(var(--input));
		border-radius: 14px;
		outline: none;

		transition: all 0.2s;

		&:focus-visible {
			border-color: rgb(245 245 244 / 1);
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

	&__file-name,
	&__field {
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

	&__error {
		padding-left: 12px;

		font-size: 12px;
		font-weight: 200;
		color: hsl(var(--destructive));
	}

	&__action,
	&__clear {
		position: absolute;
		top: 14px;
		right: 12px;

		cursor: pointer;
	}
}
</style>