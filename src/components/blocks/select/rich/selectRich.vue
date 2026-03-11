<template>
	<FieldWrapperRich class="select-rich" :label :error>
		<Select v-model="value" v-model:search="search" :items :multiple :clearable :searchable />
	</FieldWrapperRich>
</template>

<script setup lang="ts">
import { FieldWrapperRich } from '@/components/structures'
import Select from '../default/select.vue'

import { defaultProps } from '../default/props'
import type { Props } from '../default/props'

withDefaults(defineProps<Props>(), defaultProps)

const value = defineModel<string | string[]>({
	type: [String, Array],
	default: '',
})

const search = defineModel<string>('search', {
	type: String,
	default: '',
})
</script>

<style>
.select-rich {
	.select {
		width: 120px;
		height: 25px;
	}

	.select__trigger {
		height: 25px;
		border-radius: 8px;
		border: 1px solid #ffffff1a;
		background: transparent;
		padding: 8px 0;
	}

	.select__showed-value {
		padding: 4px 24px 4px 8px;
	}

	.select__clear {
		top: 3px;
		right: 20px;
	}

	.select__state {
		top: 3px;
		right: 3px;
	}
}
</style>