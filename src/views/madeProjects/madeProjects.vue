<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Grid :columns="1">
			<PageTitle>
				Мои объявления
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
					:loading
					showing-proposals
					showing-chat
					showing-remove
					showing-status
					@show-proposals="showProposals"
					@show-chat="openChat"
					@remove="showDeleteConfirmation"
				/>
			</template>
		</Grid>
	</Grid>

	<ModalProposals
		v-if="openedProject"
		:project="openedProject"
		@chose-proposal="pickDesigner"
		@close="closeResponses"
	/>

	<Modal
		v-if="openedChat"
		:width="600"
		@close="closeChat"
	>
		<Chat
			:project="openedChat"
			rating-type="ratingDesigner"
			user-type="designer"
			@update:status="updateStatus"
			@update:rating="updateRating"
		/>
	</Modal>

	<ModalDeleteConfirmation
		v-if="deleteConfirmationModal.show"
		@remove="remove"
		@close="hideDeleteConfirmation"
	>
		Вы уверены, что хотите удалить объявление?
	</ModalDeleteConfirmation>
</template>

<script setup lang="ts">
import { reactive, ref, type Ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

import { Grid, Modal } from '@/components/structures'
import { Chat, ModalDeleteConfirmation, ModalProposals } from '@/components/sections'
import { EmptyProjectCard, ProjectCard } from '@/components/blocks'
import { PageTitle } from '@/components/elements'
import type { IRating } from '@/types/rating.ts'
import { Http } from '@/plugins'
import type { IUser } from '@/types/user.ts'
import type { IProject, IProjects, IProjectStatus } from '@/types/project.ts'

const auth = useAuthStore()

const projects: Ref<Array<IProject>> = ref([])

const loading = ref(true)
const getUserProjects = async () => {
	if (auth.user.id === '') return

	loading.value = true

	await Http
		.get<IProjects>('/collections/projects/records', {
			filter: `(creator='${auth.user.id}')`,
			expand: ['proposals', 'proposals.user', 'type', 'discipline', 'designer', 'ratingDesigner']
		})
		.then(response => {
			projects.value = response.items
		})

	loading.value = false
}

watch(() => auth.user.id, getUserProjects, { immediate: true })

const openedProject: Ref<IProject | null> = ref(null)

const showProposals = async (project: IProject) => {
	openedProject.value = project
}

const closeResponses = () => {
	openedProject.value = null
}

const pickDesigner = async (user: IUser) => {
	if (!openedProject.value || loading.value) return
	const designerChat = openedProject.value.expand?.proposals?.find(proposal => proposal.user === user.id)?.chat

	loading.value = true

	await Http
		.patch(`/collections/projects/records/${openedProject.value.id}`, {
			designer: user.id,
			status: 'in_progress',
			chat: designerChat
		})
		.then(() => {
			closeResponses()
			getUserProjects()
		})
}

const remove = async () => {
	const project = deleteConfirmationModal.project
	if (!project) return

	await Http
		.delete(`/collections/projects/records/${project.id}`)
		.then(() => {
			projects.value = projects.value.filter((item) => item.id !== project.id)
		})

	hideDeleteConfirmation()
}

const openedChat: Ref<IProject | null> = ref(null)
const openChat = (project: IProject) => openedChat.value = project

const closeChat = () => openedChat.value = null

const updateStatus = async (status: IProjectStatus) => {
	if (openedChat.value) {
		openedChat.value.status = status
	}
}

const updateRating = async (rating: IRating) => {
	if (openedChat.value && openedChat.value.expand) {
		openedChat.value.ratingDesigner = rating.id
		openedChat.value.expand.ratingDesigner = rating
	}
}

const deleteConfirmationModal = reactive<{
	show: boolean
	project: IProject | null
}>({
	show: false,
	project: null
})
const showDeleteConfirmation = (project: IProject) => {
	deleteConfirmationModal.show = true
	deleteConfirmationModal.project = project
}
const hideDeleteConfirmation = () => {
	deleteConfirmationModal.show = false
	deleteConfirmationModal.project = null
}
</script>
