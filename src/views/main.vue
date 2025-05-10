<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Text size="l">
			Фильтры
		</Text>
		<Grid
			v-if="projects.length || loadingProject"
			:columns-xl="4"
			:columns-l="3"
			:columns-m="2"
			:columns-s="1"
		>
			<CreativeCard/>
			<template v-if="loadingProject">
				<EmptyProjectCard
					v-for="i in 8"
					:key="i"
				/>
			</template>
			<template v-else>
				<ProjectCard
					v-for="project in projects"
					:key="project.id"
					:project="project"
				/>
			</template>
		</Grid>
		<Text
			v-else
			size="xs"
		>
			Нет доступных объявлений.
		</Text>
	</Grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { IProject, IProjects } from '@/interfaces/Project.ts'
import { Grid } from '@/components/structures'
import { EmptyProjectCard, ProjectCard, CreativeCard } from '@/components/blocks'
import { Text } from '@/components/elements'
import { Http, Datetime } from '@/plugins'

const loadingProject = ref(true)
const projects = ref<Array<IProject>>([])
const loadProject = async () => {
	loadingProject.value = true

	const filter = `(status='created' && deadline>='${Datetime.get(new Date())}')`
	const encodedFilter = encodeURIComponent(filter)

	await Http
		.get<IProjects>('/collections/projects/records', {
			filter: encodedFilter,
			expand: ['creator', 'type', 'discipline'],
			perPage: 12
		})
		.then(res => {
			projects.value = res.items
		})

	loadingProject.value = false
}
loadProject()
</script>