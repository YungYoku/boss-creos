<template>
	<ProjectCard
		:project="emptyProject"
		loading
	/>
</template>

<script setup lang="ts">
import ProjectCard from '../projectCard.vue'
import { emptyProject } from '@/types/project'
</script>