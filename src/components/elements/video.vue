<template>
	<video
		:src="videoSrc"
		:loading="typeof props.src === 'string' ? 'eager' : 'lazy'"
		:poster="previewSrc"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IFile } from '@/interfaces/File.ts'

interface Props {
	src: string | IFile,
	preview: string | IFile,
}

const props = withDefaults(defineProps<Props>(), {
	src: '',
	preview: '',
})

const getFileSrc = (file: IFile) => {
	return `${import.meta.env.VITE_API}/files/${file.collectionId}/${file.id}/${file.file}`
}

const videoSrc = computed(() => {
	const src = props.src

	if (typeof src === 'string') return src

	return getFileSrc(src)
})

const previewSrc = computed(() => {
	const src = props.preview

	if (typeof src === 'string') return src

	return getFileSrc(src)
})
</script>
