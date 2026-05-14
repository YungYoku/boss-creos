<template>
	<Image
		class="icon"
		:class="[`_${size}`, currentColor]"
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

const props = defineProps({
	name: {
		type: String,
		default: 'file'
	},
	size: {
		type: String,
		default: 's',
		validator: (size: string) => {
			return ['xs', 's', 'm', 'l', 'xl'].includes(size)
		}
	},
	colors: {
		type: Array,
		default: () => ['light', 'dark']
	},
	pointer: {
		type: Boolean,
		default: true
	}
})

const currentColor = computed(() => {
	const colorIndex = 0

	return props.colors[colorIndex]
})

const src = computed(() => {
	return new URL(`./icons/${props.name}.svg`, import.meta.url).href
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