<template>
	<Grid
		class="checkbox"
		:class="{
			_disabled: disabled
		}"
		:columns="['16px', 1]"
		ver-align="center"
		@click="toggle"
	>
		<div
			class="checkbox__content"
			:class="{
				_active: value ?? checked
			}"
		>
			<Icon
				v-if="value ?? checked"
				name="check"
				size="xs"
				:colors="['dark', 'light']"
			/>
		</div>

		<div
			v-if="label"
			class="checkbox__label"
		>
			{{ label }}
		</div>
	</Grid>

	<span
		v-if="error"
		class="checkbox__error"
	>
		{{ error }}
	</span>
</template>

<script setup lang="ts">
import { Grid } from '@/components/structures'
import { Icon } from '@/components/elements'

interface Props {
	error?: string | null
	checked?: boolean
	disabled?: boolean
	label?: string
}

const { error = null, checked = false, disabled = false, label = '' } = defineProps<Props>()

const value = defineModel<boolean>({
	default: false
})

const toggle = () => {
	if (disabled) return

	if (value.value !== null) {
		value.value = !value.value
	}
}
</script>

<style scoped>
.checkbox {
	cursor: pointer;

	.checkbox__content {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 16px;
		height: 16px;
		background: hsl(var(--accent));
		border: 1px solid hsl(var(--primary));
		border-radius: 5px;

		&._active {
			background: hsl(var(--primary));
		}
	}

	.checkbox__label {
		font-weight: 300;
		text-align: left;
	}
}
</style>