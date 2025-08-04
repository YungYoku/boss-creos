<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Grid :columns="1">
			<PageTitle>
				Избранное
			</PageTitle>
		</Grid>

		<Grid
			v-if="loading || projects.length"
			:columns-xl="4"
			:columns-l="3"
			:columns-m="2"
			:columns-s="1"
		>
			<template v-if="loading">
				<EmptyProjectCard
					v-for="i in 8"
					:key="i"
				/>
			</template>
			<template v-else-if="projects.length">
				<ProjectCard
					v-for="project in projects"
					:key="project.id"
					:project="project"
					:loading="loading"
					showing-remove
					showing-status
					@remove="remove"
				/>
			</template>
		</Grid>

		<Text v-else>
			Пусто
		</Text>
	</Grid>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

import { Grid } from '@/components/structures'
import { EmptyProjectCard, ProjectCard } from '@/components/blocks'
import { PageTitle, Text } from '@/components/elements'

import { Http } from '@/plugins'
import { IProject, IProjects } from '@/types/Project.ts'

const auth = useAuthStore()

const projects: Ref<Array<IProject>> = ref([])

const loading = ref(true)
const getUserProjects = async () => {
	if (auth.user.id === '') return

	loading.value = true

	if (auth.user.favorite.length === 0) {
		loading.value = false
		return
	}

	await Http
		.get<IProjects>('/collections/projects/records', {
			filter: `(${auth.user.favorite.reduce((result, id) => result + `id='${id}' || `, '').slice(0, -3)})`,
			expand: ['proposals', 'type', 'discipline']
		})
		.then(response => {
			projects.value = response.items
		})

	loading.value = false
}

watch(() => auth.user.id, getUserProjects, { immediate: true })

const remove = async (project: IProject) => {
	await Http
		.delete(`/collections/projects/records/${project.id}`)
		.then(() => {
			projects.value = projects.value.filter((item) => item.id !== project.id)
		})
}
</script>
