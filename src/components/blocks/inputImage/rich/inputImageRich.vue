<template>
	<FieldWrapperRich
		class="input-image-rich"
		:label
		:error
	>
		<InputImage
			v-model="value"
			:loading
			:accept
			@update:name="updateName"
		/>
	</FieldWrapperRich>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import { FieldWrapperRich } from '@/components/structures'

import type { Props } from '../default/props'
import { defaultProps } from '../default/props'
import InputImage from '../default/inputImage.vue'

withDefaults(defineProps<Props>(), defaultProps)


const emit = defineEmits(['update:name'])
const updateName = (value: string) => {
	emit('update:name', value)
}

const value = defineModel<string | null>({
	type: Object as PropType<string | null>,
	default: null,
})
</script>

<style lang="scss">
.input-image-rich {
	.input {
		width: 120px;
		height: 25px;
	}

	.input__field,
	.input__file-name {
		padding: 2px 40px 4px 8px;
	}

	.input__file-name {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.input__field-wrap {
		height: 25px;
		border-radius: 8px;
		border: 1px solid #FFFFFF1A;
		background: transparent;
	}

	.input__clear {
		top: 5px;
		right: 20px;
	}

	.input-image__icon {
		top: 5px;
		right: 5px;
	}
}
</style>