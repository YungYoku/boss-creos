<template>
	<FieldWrapperRich
		class="switcher-rich"
		:label
		:error
	>
		<Switcher
			v-model="value"
			:checked
			:disabled
		/>
	</FieldWrapperRich>
</template>

<script setup lang="ts">
import { FieldWrapperRich } from '@/components/structures'

import Switcher from '../default/switcher.vue'
import type { Props } from '../default/props'
import { defaultProps } from '../default/props'

withDefaults(defineProps<Props>(), defaultProps)

const value = defineModel<boolean>({
	type: Boolean,
	default: null
})
</script>

<style lang="scss">
.switcher-rich {
	.switcher__content {
		border-radius: 8px;
		border: 1px solid #FFFFFF1A;
		background: transparent;
	}
}
</style>