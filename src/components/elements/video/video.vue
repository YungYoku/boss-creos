<template>
	<video
		ref="video"
		class="video"
		:src="videoSrc"
		:loading="typeof props.src === 'string' ? 'eager' : 'lazy'"
		:poster="previewSrc"
		:controls="showControls"
		@click="showVideo"
	/>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import type { IImage, IVideo } from '@/types/file'

interface Props {
	src: string | IVideo,
	preview: string | IImage,
}

const props = withDefaults(defineProps<Props>(), {})

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

<style lang="scss" scoped>
.video {
	cursor: pointer;
}
</style>