<template>
	<Popover class="select">
		<template #trigger="{ opened }">
			<div class="select__trigger">
				<Label
					v-if="label"
					:active="!isEmpty"
				>
					{{ label }}
				</Label>

				<Text
					v-if="showedValue"
					class="select__showed-value"
					size="xs"
				>
					{{ showedValue }}
				</Text>

				<Icon
					v-if="clearable && value.length > 0"
					class="select__clear"
					name="close"
					size="s"
					@click.prevent.stop="clear"
				/>

				<Icon
					class="select__state"
					:name="opened ? 'arrow-up' : 'arrow-down'"
					size="s"
				/>
			</div>

			<span
				v-if="error"
				class="select__error"
			>
				{{ error }}
			</span>
		</template>

		<Input
			v-if="searchable"
			v-model="search"
			:label="label"
			:clearable="false"
			variant="plain"
		/>

		<Separator />

		<div class="select__content">
			<div
				v-for="item in items"
				:key="item.id"
				class="select__item"
				:class="{
					_active: value === item.id && !multiple
				}"
				@click="chooseValue(item)"
			>
				<Checkbox
					v-if="multiple"
					:checked="value.includes(item.id)"
					disabled
					:label="item.name"
				/>

				<template v-else>
					<Text size="xs">
						{{ item.name }}
					</Text>

					<Icon
						v-if="value === item.id"
						name="check"
						size="xs"
					/>
				</template>
			</div>
		</div>
	</Popover>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Popover } from '@/components/structures'
import { Checkbox, Input } from '@/components/blocks'
import { Icon, Label, Separator, Text } from '@/components/elements'

import type { Item, Props } from './props'
import { defaultProps } from './props'

const value = defineModel<string | string[]>({
	type: [String, Array],
	default: ''
})

const search = defineModel<string>('search', {
	type: String,
	default: ''
})

const props = withDefaults(defineProps<Props>(), defaultProps)

const validationError = new Error('Select multiple, but value is not an array')

const isEmpty = computed(() => {
	const _value = value.value

	if (props.multiple) {
		if (!Array.isArray(_value)) throw validationError
		return _value.length === 0
	}
	return _value === ''
})

const showedValue = computed(() => {
	const _value = value.value

	if (props.multiple) {
		if (!Array.isArray(_value)) throw validationError
		const items = _value.length > 7 ? _value.slice(0, 7) : _value

		if (items.length === 0) return null

		const getItemName = (id: string) => {
			return props.items.find(item => item.id === id)?.name ?? ''
		}

		const result = items
			.reduce((acc, item) => `${acc}, ${getItemName(item).trim()}`, '')
			.slice(2)
		const extra =
			_value.length > 7
				? `, ... (${_value.length.toString()})`
				: ` (${_value.length.toString()})`
		return `${result}${extra}`
	}
	return props.items.find(item => item.id === _value)?.name ?? null
})

const chooseValue = (item: Item) => {
	if (props.multiple) {
		if (!Array.isArray(value.value)) throw validationError

		if (value.value.includes(item.id)) {
			value.value = value.value.filter(val => val !== item.id)
		} else {
			value.value.push(item.id)
		}
	} else {
		if (value.value === item.id) {
			value.value = ''
		} else {
			value.value = item.id
		}
	}
}

const clear = () => {
	if (props.multiple && Array.isArray(value.value)) {
		value.value = []
	} else {
		value.value = ''
	}
}
</script>

<style scoped>
.select {
	.select__trigger {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 48px;
		padding: 8px 12px;
		background: hsl(var(--background));
		border: 1px solid hsl(var(--input));
		border-radius: 14px;
		transition: all 0.2s;

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

	.select__showed-value {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 100%;
		padding-top: 12px;

		&._empty {
			padding-top: initial;
			color: hsl(var(--muted-foreground));
		}
	}

	.select__clear {
		position: absolute;
		top: 14px;
		right: 34px;
		cursor: pointer;
	}

	.select__state {
		position: absolute;
		top: 14px;
		right: 12px;
		cursor: pointer;
	}

	.select__error {
		padding-left: 12px;
		font-size: 12px;
		font-weight: 200;
		color: hsl(var(--destructive));
	}

	.select__content {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 4px;
		overflow: auto;
	}

	.select__item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 32px;
		min-height: 32px;
		padding: 8px;
		overflow: hidden;
		white-space: nowrap;
		background-color: hsl(var(--background));
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			background-color: hsl(var(--accent));
		}

		&._active {
			background-color: hsl(var(--accent));
		}
	}
}
</style>