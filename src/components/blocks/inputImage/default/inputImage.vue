<template>
	<div class="input-image">
		<Button
			v-if="compact"
			:disabled="loading"
			variant="outline"
			class="input-image__button"
		>
			<Icon name="file"/>

			<div
				class="input-image__field-wrap"
				:class="{
					'_compact': compact
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
			class="input-image__field-wrap"
			:class="{
				'_compact': compact
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

			<Icon
				class="input-image__icon"
				name="download"
				size="xs"
				:colors="['dark', 'light']"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import { Button, Input } from '@/components/blocks'
import { Icon } from '@/components/elements'
import { Http } from '@/plugins'

import type { Props } from './props'
import { defaultProps } from './props'

withDefaults(defineProps<Props>(), defaultProps)


const emit = defineEmits(['update:name'])
const updateName = (value: string) => {
	emit('update:name', value)
}

const value = defineModel<string | null>({
	type: Object as PropType<string | null>,
	default: null,
})
const updateFile = async (file: File) => {
	updateName(file.name)

	const formData = new FormData()

	formData.append('image', file)

	value.value = await Http
		.post<{ id: string }>('/upload/image', formData)
		.then(({ id }) => id)
}
</script>

<style scoped>
.input-image {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	.input-image__button {
		position: absolute;
		top: 0;
		left: 0;
	}

	.input-image__field-wrap {
		width: 100%;
		position: relative;

		&._compact {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			opacity: 0;
		}
	}

	.input-image__icon {
		position: absolute;
		right: 15px;
		top: 15px;
		pointer-events: none;
		user-select: none;
	}
}
</style>