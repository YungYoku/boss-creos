<template>
	<div class="input-file">
		<Button
			v-if="compact"
			:disabled="loading"
			variant="outline"
			class="input-file__button"
		>
			<Icon name="file" />

			<div
				class="input-file__field-wrap"
				:class="{
					_compact: compact
				}"
			>
				<Input
					:disabled="loading"
					:error
					:accept
					type="file"
					cursor="pointer"
					transparent
					@update-file="updateFile"
				/>
			</div>
		</Button>

		<div
			v-else
			class="input-file__field-wrap"
			:class="{
				_compact: compact
			}"
		>
			<Input
				:disabled="loading"
				:error
				:accept
				type="file"
				cursor="pointer"
				:label
				transparent
				@update-file="updateFile"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import { Button, Input } from '@/components/blocks'
import { Icon } from '@/components/elements'
import { Http } from '@/plugins'

interface Props {
	error?: string | null
	loading?: boolean
	compact?: boolean
	label?: string
	accept?: string
}

withDefaults(defineProps<Props>(), {
	error: null,
	loading: false,
	compact: false,
	label: '',
	accept: ''
})

const emit = defineEmits(['update:name'])
const updateName = (value: string) => {
	emit('update:name', value)
}

const value = defineModel<string | null>({
	type: Object as PropType<string | null>,
	default: null
})
const updateFile = async (file: File) => {
	updateName(file.name)

	const formData = new FormData()

	formData.append('file', file)

	value.value = await Http.post<{ id: string }>('/collections/files/records', formData).then(
		({ id }) => id
	)
}
</script>

<style scoped>
.input-file {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	.input-file__button {
		position: absolute;
		top: 0;
		left: 0;
	}

	.input-file__field-wrap {
		width: 100%;

		&._compact {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			opacity: 0;
		}
	}
}
</style>