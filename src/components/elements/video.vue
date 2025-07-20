<template>
	<video
		:src="videoSrc"
		:loading="typeof props.src === 'string' ? 'eager' : 'lazy'"
		:poster="previewSrc"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IImage, IVideo } from '@/interfaces/File.ts'

interface Props {
	src: string | IVideo,
	preview: string | IImage,
}

const props = withDefaults(defineProps<Props>(), {
	src: '',
	preview: '',
})

const getFileSrc = (file: IVideo | IImage, src: string) => {
	return `${import.meta.env.VITE_API}/files/${file.collectionId}/${file.id}/${src}`
}

const videoSrc = computed(() => {
	const file = props.src

	if (typeof file === 'string') return file

	return getFileSrc(file, file.watermarked_video)
})

const previewSrc = computed(() => {
	const file = props.preview

	if (typeof file === 'string') return file

	return getFileSrc(file, file.watermarked_image)
})
</script>
