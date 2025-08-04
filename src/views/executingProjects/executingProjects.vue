<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Grid :columns="1">
			<PageTitle>
				Выполняемые объявления
			</PageTitle>
		</Grid>

		<Grid
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
			<template v-else>
				<ProjectCard
					v-for="project in projects"
					:key="project.id"
					:project="project"
					:loading="loading"
					showing-chat
					showing-status
					@show-chat="openChat"
				/>
			</template>
		</Grid>
	</Grid>

	<Modal
		v-if="openedChat"
		:width="600"
		@close="closeChat"
	>
		<Chat
			:project="openedChat"
			rating-type="ratingBuyer"
			user-type="buyer"
			@update:status="updateStatus"
			@update:rating="updateRating"
		/>
	</Modal>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

import { Http } from '@/plugins'
import { IProject, IProjects, IProjectStatus } from '@/types/Project.ts'
import { Grid, Modal } from '@/components/structures'
import { Chat } from '@/components/sections'
import { EmptyProjectCard, ProjectCard } from '@/components/blocks'
import { PageTitle } from '@/components/elements'
import { IRating } from '@/types/Rating.ts'

const auth = useAuthStore()

const projects: Ref<Array<IProject>> = ref([])

const loading = ref(true)
const getUserProjects = async () => {
	if (auth.user.id === '') return

	loading.value = true

	await Http
		.get<IProjects>('/collections/projects/records', {
			filter: `(designer='${auth.user.id}')`,
			expand: ['creator', 'creator.avatar']
		})
		.then(response => {
			projects.value = response.items
		})

	loading.value = false
}

watch(() => auth.user.id, getUserProjects, { immediate: true })

const openedChat: Ref<IProject | null> = ref(null)
const openChat = (project: IProject) => {
	openedChat.value = project
}

const closeChat = () => openedChat.value = null

const updateStatus = (status: IProjectStatus) => {
	if (openedChat.value) {
		openedChat.value.status = status
	}
}

const updateRating = (rating: IRating) => {
	if (openedChat.value && openedChat.value.expand) {
		openedChat.value.ratingBuyer = rating.id
		openedChat.value.expand.ratingBuyer = rating
	}
}
</script>
