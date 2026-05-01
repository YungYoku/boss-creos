<template>
	<CreativeCard :creative="emptyCreative" />
</template>

<script setup lang="ts">
import CreativeCard from '../creativeCard.vue'
import { emptyCreative } from '@/types/creative'
</script>