<template>
	<img
		:src="image"
		:alt="alt"
		:loading="typeof props.src === 'string' ? 'eager' : 'lazy'"
	>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IFile } from '@/interfaces/File.ts'

interface Props {
	src: string | IFile,
	alt?: string
}

const props = withDefaults(defineProps<Props>(), {
	src: '',
	alt: ''
})

const image = computed(() => {
	const src = props.src

	if (typeof src === 'string') return src

	return `${import.meta.env.VITE_API}/files/${src.collectionId}/${src.id}/${src.file}`
})
</script>
