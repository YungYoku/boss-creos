<template>
	<FieldWrapperRich
		class="select-live-rich"
		:label
		:error
	>
		<SelectLive
			v-model="value"
			label=""
			:type-key
			:api
			:filter-fields
			:exclude
			:multiple
		/>
	</FieldWrapperRich>
</template>

<script setup lang="ts">
import { FieldWrapperRich } from '@/components/structures'
import SelectLive from '../default/selectLive.vue'

import { defaultProps } from '../default/props'
import type { Props } from '../default/props'

withDefaults(defineProps<Props>(), defaultProps)

const value = defineModel<string | string[]>({
	type: [String, Array],
	default: ''
})
</script>

<style lang="scss">
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
			border: 1px solid #FFFFFF1A;
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