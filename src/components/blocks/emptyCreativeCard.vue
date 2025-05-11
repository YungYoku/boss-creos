<template>
	<CreativeCard
		:creative="emptyCreative"
		loading
	/>
</template>

<script setup lang="ts">
import CreativeCard from './creativeCard.vue'
import { emptyCreative } from '@/interfaces/Creative.ts'
</script>
