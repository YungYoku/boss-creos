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

const { error = null, checked = false, disabled = false, label = '' } = defineProps<Props>()

const value = defineModel<boolean>({
	default: false
})
</script>

<style>
.switcher-rich {
	.switcher__content {
		border-radius: 8px;
		border: 1px solid #ffffff1a;
		background: transparent;
	}
}
</style>