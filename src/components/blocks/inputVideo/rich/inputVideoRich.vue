<template>
	<FieldWrapperRich
		class="input-video-rich"
		:label
		:error
	>
		<InputVideo
			v-model="value"
			:loading
			:accept
			@update:name="updateName"
		/>
	</FieldWrapperRich>
</template>

<script setup lang="ts">
import { FieldWrapperRich } from '@/components/structures'

import type { Props } from '../default/props'
import InputVideo from '../default/inputVideo.vue'

const { error = null, loading = false, label = '', accept = '' } = defineProps<Props>()

const emit = defineEmits(['update:name'])
const updateName = (value: string) => {
	emit('update:name', value)
}

const value = defineModel<string>({
	default: null
})
</script>

<style>
.input-video-rich {
	.input-video {
		width: 120px;
		height: 25px;

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
			border: 1px solid #ffffff1a;
			background: transparent;
		}

		.input__clear {
			top: 5px;
			right: 20px;
		}

		.input-video__icon {
			top: 5px;
			right: 5px;
		}
	}
}
</style>