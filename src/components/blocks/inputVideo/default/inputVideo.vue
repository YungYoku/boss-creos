<template>
	<div class="input-video">
		<Button
			v-if="compact"
			:disabled="loading"
			variant="outline"
			class="input-video__button"
		>
			<Icon name="video" />
			<slot />

			<div
				class="input-video__field-wrap"
				:class="{
					_compact: compact
				}"
			>
				<Input
					v-model="value"
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
			class="input-video__field-wrap"
			:class="{
				_compact: compact
			}"
		>
			<Input
				v-model="value"
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
				class="input-video__icon"
				name="download"
				size="xs"
				:colors="['dark', 'light']"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Button, Input } from '@/components/blocks'
import { Icon } from '@/components/elements'
import { Http } from '@/plugins'

import type { Props } from './props'

const {
	error = null,
	loading = false,
	compact = false,
	label = '',
	accept = ''
} = defineProps<Props>()

const name = defineModel<string | null>('name', {
	default: null
})
const updateName = (value: string) => {
	name.value = value
}

const value = defineModel<string>({
	default: null
})
const updateFile = async (file: File) => {
	updateName(file.name)

	const formData = new FormData()

	formData.append('video', file)

	value.value = await Http.post<{ id: string }>('/upload/video', formData).then(({ id }) => id)
}
</script>

<style scoped>
.input-video {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	.input-video__button {
		gap: 10px;
	}

	.input-video__field-wrap {
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

	.input-video__icon {
		position: absolute;
		right: 15px;
		top: 15px;
		pointer-events: none;
		user-select: none;
	}
}
</style>