<template>
	<img
		:src="image"
		:alt="alt"
		:loading="typeof src === 'string' ? 'eager' : 'lazy'"
		@click="e => emit('click', e)"
		@mouseenter="e => emit('mouseenter', e)"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IImage } from '@/types/file'

const emit = defineEmits(['click', 'mouseenter'])

interface Props {
	src: string | IImage
	alt?: string
}

const { src, alt = '' } = defineProps<Props>()

const image = computed(() => {
	if (typeof src === 'string') return src

	return `${import.meta.env.VITE_API}/files/${src.collectionId}/${src.id}/${src.watermarked_image}`
})
</script>
