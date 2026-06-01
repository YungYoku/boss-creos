<template>
	<div
		class="message"
		:class="{
			_self: self
		}"
	>
		<Text size="xs">
			{{ message.text }}
		</Text>

		<File
			v-if="message.expand?.file?.file"
			:src="`${message.expand.file.collectionId}/${message.expand.file.id}/${message.expand.file.file}`"
			:color="self ? 'dark' : 'light'"
		/>

		<span class="message__date">{{ $date(created, 'fullDatetime') }}</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { File, Text } from '@/components/elements'
import type { IMessage } from '@/types/message'

interface Props {
	message: IMessage
	self?: boolean
}

const { message, self = false } = defineProps<Props>()

const created = computed(() => new Date(message.created))
</script>

<style scoped>
.message {
	display: flex;
	flex-direction: column;
	width: max-content;
	max-width: 50%;
	margin-right: auto;
	padding: 8px 12px;
	background-color: hsl(var(--muted));
	border-radius: 8px 8px 8px 0;
	gap: 4px;

	&._self {
		margin-right: initial;
		margin-left: auto;
		color: hsl(var(--primary-foreground));
		background-color: hsl(var(--primary));
		border-radius: 8px 8px 0;
	}

	.message__date {
		font-size: 12px;
	}
}
</style>
