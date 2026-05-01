<template>
	<FieldWrapperRich
		class="input-rich"
		:label
		:error
	>
		<Input
			v-model="value"
			:loading
			:disabled
			:type
			:icon
			:autocomplete
			:cursor
			:clearable
			:variant
			:transparent
			:accept
			@action="action"
		/>
	</FieldWrapperRich>
</template>

<script setup lang="ts" generic="T extends string | number | null">
import Input from '../default/input.vue'

import type { Props } from '../default/props'
import { defaultProps } from '../default/props'
import FieldWrapperRich from '@/components/structures/fieldWrapperRich/fieldWrapperRich.vue'

withDefaults(defineProps<Props>(), defaultProps)

const value = defineModel<T>({
	default: null
})

const emit = defineEmits(['action'])
const action = () => {
	emit('action')
}
</script>

<style>
.input-rich {
	.input {
		width: 120px;
		height: 25px;
	}

	.input__field-wrap {
		height: 25px;
		border-radius: 8px;
		border: 1px solid #ffffff1a;
		background: transparent;
	}

	.input__field {
		padding: 4px 24px 4px 8px;
	}

	.input__clear {
		top: 3px;
		right: 3px;
	}
}
</style>