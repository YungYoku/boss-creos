<template>
	<video
		ref="video"
		class="video"
		:src="videoSrc"
		:poster="previewSrc"
		:controls="showControls"
		@click="showVideo"
	/>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import type { IImage, IVideo } from '@/types/file'

interface Props {
	src: string | IVideo
	preview: string | IImage
}

const { src, preview } = defineProps<Props>()

const getFileSrc = (file: IVideo | IImage, src: string) => {
	return `${import.meta.env.VITE_API}/files/${file.collectionId}/${file.id}/${src}`
}

const videoSrc = computed(() => {
	if (typeof src === 'string') return src

	return getFileSrc(src, src.watermarked_video)
})

const previewSrc = computed(() => {
	if (typeof preview === 'string') return preview

	return getFileSrc(preview, preview.watermarked_image)
})

const videoRef = useTemplateRef('video')
const showControls = ref(false)

const showVideo = () => {
	const video = videoRef.value
	if (!video) return

	showControls.value = true
	if (video.paused) {
		video.play()
	}
}
</script>

<style scoped>
.video {
	cursor: pointer;
}
</style>