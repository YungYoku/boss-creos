<template>
	<video
		ref="video"
		class="video"
		:src="videoSrc"
		:loading="typeof props.src === 'string' ? 'eager' : 'lazy'"
		:poster="previewSrc"
		@click="playVideo"
	/>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
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

const videoRef = useTemplateRef('video')

const playVideo = () => {
	const video = videoRef.value
	if (!video) return

	if (video.paused) {
		video.play()
	} else {
		video.pause()
		video.currentTime = 0
		video.load()
	}
}
</script>

<style lang="scss" scoped>
.video {
	cursor: pointer;
}
</style>