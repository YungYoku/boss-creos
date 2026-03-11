<template>
	<FieldWrapperRich
		class="textarea-rich"
		:label
		:error
	>
		<Textarea
			v-model="value"
			:height
			:disabled
		/>
	</FieldWrapperRich>
</template>

<script setup lang="ts">
import FieldWrapperRich from '@/components/structures/fieldWrapperRich/fieldWrapperRich.vue'
import Textarea from '../default/textarea.vue'

import type { Props } from '../default/props'
import { defaultProps } from '../default/props'

withDefaults(defineProps<Props>(), defaultProps)

const value = defineModel<string>({
	type: String,
	default: ''
})
</script>

<style>
.textarea-rich {
	.field-wrapper-rich__content {
		align-items: flex-start;
	}

	.textarea {
		width: 100%;
	}

	.textarea__field {
		padding: 4px 24px 4px 8px;
		border-radius: 8px;
		border: 1px solid #ffffff1a;
		background: transparent;
	}

	.textarea__clear {
		top: 5px;
		right: 5px;
	}
}
</style>