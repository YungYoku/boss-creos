<template>
	<Text
		size="xl"
		:loading="loading"
	>
		<slot />
	</Text>
</template>

<script setup lang="ts">
import { Text } from '@/components/elements'

interface Props {
	loading?: boolean
}

const { loading = false } = defineProps<Props>()
</script>
