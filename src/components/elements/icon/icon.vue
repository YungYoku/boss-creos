<template>
	<Image
		class="icon"
		:class="[`_${size}`, color]"
		:style="{
			cursor: pointer ? 'pointer' : 'initial'
		}"
		:src="src"
		alt="icon"
		@click="e => emit('click', e)"
		@mouseenter="e => emit('mouseenter', e)"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import Image from '../image/image.vue'

const emit = defineEmits(['click', 'mouseenter'])

interface Props {
	name?: string
	size?: 'xs' | 's' | 'm' | 'l' | 'xl'
	color?: 'light' | 'dark'
	pointer?: boolean
}

const { name = 'file', size = 's', color = 'light', pointer = true } = defineProps<Props>()

const src = computed(() => {
	return new URL(`./icons/${name}.svg`, import.meta.url).href
})
</script>

<style scoped>
.icon {
	&.light {
		filter: invert(1);
	}

	&._xs {
		width: 15px;
		max-width: 15px;
		max-height: 15px;
	}

	&._s {
		width: 20px;
		max-width: 20px;
		max-height: 20px;
	}

	&._m {
		width: 30px;
		max-width: 30px;
		max-height: 30px;
	}

	&._l {
		width: 40px;
		max-width: 40px;
		max-height: 40px;
	}

	&._xl {
		width: 50px;
		max-width: 50px;
		max-height: 50px;
	}
}
</style>