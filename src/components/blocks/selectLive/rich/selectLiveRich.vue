<template>
	<FieldWrapperRich
		class="select-live-rich"
		:label
		:error
	>
		<SelectLive
			v-model="value"
			label=""
			:api
			:filter-fields
			:exclude
			:multiple
		/>
	</FieldWrapperRich>
</template>

<script setup lang="ts" generic="T extends string | string[]">
import { FieldWrapperRich } from '@/components/structures'
import SelectLive from '../default/selectLive.vue'

import type { Props } from '../default/props'

const {
	error = null,
	label = 'Значение',
	api = '',
	filterFields = ['id', 'name'],
	exclude,
	multiple = false
} = defineProps<Props>()

const value = defineModel<T>({
	default: null
})
</script>

<style>
.select-live-rich {
	.select {
		width: 120px;
		height: 25px;

		.popover__trigger {
			height: 25px;
			border-radius: 8px;
			border: none;
			background: transparent;
			padding: 0;
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
}
</style>
