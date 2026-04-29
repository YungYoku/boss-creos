<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Grid
			:columns-xl="[1, '119px', '126px']"
			:columns-m="[1, 1]"
			:columns-s="1"
		>
			<PageTitle :loading="loading">
				{{ project.title }}
			</PageTitle>

			<template v-if="!loading && project.status === 'created'">
				<Button
					v-if="authStore.isAdmin || isItMyProject"
					:disabled="loading"
					variant="destructive"
					@click="showDeleteConfirmation"
				>
					Удалить
				</Button>

				<Button
					v-if="isItMyProject"
					:to="`/project/${project.id}/edit`"
					:disabled="loading"
				>
					Редактировать
				</Button>

				<template v-else-if="authStore.isDesigner">
					<span />
					<span v-if="isAlreadyProposed" />
					<Button
						v-else
						:disabled="loading"
						@click="showMakeProposal"
					>
						Откликнуться
					</Button>
				</template>
			</template>
		</Grid>

		<Grid
			:columns-xl="2"
			:columns-l="1"
		>
			<Island>
				<Grid
					vertical
					:columns="1"
				>
					<Text
						size="m"
						:loading="loading"
					>
						Информация о заказе
					</Text>

					<Text
						size="s"
						:loading="loading"
					>
						Цена: {{ project.price }}₽
					</Text>

					<span />

					<Text
						size="s"
						:loading="loading"
					>
						Создано: {{ $date(created) }}
					</Text>
					<Text
						size="s"
						:loading="loading"
					>
						Срок сдачи: {{ $date(deadline) }}
					</Text>

					<span />

					<Text
						size="s"
						:loading="loading"
					>
						Репетиторство: {{ project.tutoring ? 'да' : 'нет' }}
					</Text>

					<Grid
						v-if="project.expand?.buyer"
						:columns="[0, 0]"
						ver-align="center"
					>
						<Text
							size="s"
							:loading="loading"
						>
							Заказчик:
						</Text>

						<UserCard
							link
							:user="project.expand.buyer"
							:loading="loading"
						/>
					</Grid>

					<Grid
						v-if="project.expand?.designer"
						:columns="[0, 0]"
						ver-align="center"
					>
						<Text
							size="s"
							:loading="loading"
						>
							Исполнитель:
						</Text>

						<UserCard
							link
							:user="project.expand.designer"
							:loading="loading"
						/>
					</Grid>
				</Grid>
			</Island>

			<Island>
				<Grid
					vertical
					:columns="1"
				>
					<Text
						size="m"
						:loading="loading"
					>
						Описание
					</Text>

					<Text
						size="s"
						:loading="loading"
					>
						{{ project.description }}
					</Text>
				</Grid>
			</Island>
		</Grid>
	</Grid>

	<ModalDeleteConfirmation
		v-if="deleteConfirmationModal.show"
		@remove="remove"
		@close="hideDeleteConfirmation"
	>
		Вы уверены, что хотите удалить объявление?
	</ModalDeleteConfirmation>

	<ModalMakeProposal
		v-if="makeProposalModal.show"
		:loading
		:default-price="project.price"
		@make-proposal="makeProposal"
		@close="hideMakeProposal"
	/>
</template>

<script setup lang="ts">
import { computed, reactive, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import { Grid, Island } from '@/components/structures'
import { ModalDeleteConfirmation, ModalMakeProposal } from '@/components/sections'
import { Button, User as UserCard } from '@/components/blocks'
import { PageTitle, Text } from '@/components/elements'
import { Http } from '@/plugins'
import type { IProject, IProjectProposal } from '@/types/project'
import { emptyProject } from '@/types/project'

const router = useRouter()

const project: Ref<IProject> = ref({ ...emptyProject })
const route = useRoute()

const getID = () => {
	return route.params.id
}

const loading = ref(true)
const loadProject = async () => {
	const id = getID()
	if (!id) return
	if (Array.isArray(id)) {
		console.warn('ID is array for some reason.')
		return
	}

	await Http.get<IProject>(`/collections/projects/records/${id}`, {
		expand: ['buyer', 'designer', 'proposals']
	}).then(response => {
		project.value = response
	})

	loading.value = false
}
void loadProject()

const remove = async () => {
	if (loading.value) return

	await Http.delete(`/collections/projects/records/${project.value.id}`).then(() => {
		void router.push('/')
	})
}

const authStore = useAuthStore()
const toast = useToast()

const makeProposalModal = reactive<{
	show: boolean
}>({
	show: false
})
const showMakeProposal = () => {
	if (isAlreadyProposed.value) return
	if (authStore.user.energy < 1) {
		toast.set('Недостаточно энергии для отклика')
		return
	}
	if (authStore.isPersonalInfoIncomplete) {
		toast.set('Для отклика на объявление требуется заполнить свои имя и фамилию!')
		return
	}

	makeProposalModal.show = true
}
const hideMakeProposal = () => (makeProposalModal.show = false)
const makeProposal = async (proposal: IProjectProposal) => {
	loading.value = true

	await Http.post<IProject>(`/make-proposal/${project.value.id}`, {
		price: proposal.price,
		text: proposal.text
	}).then(response => {
		project.value = response

		authStore.setEnergy(authStore.user.energy - 1)

		toast.set('Вы успешно откликнулись')
	})

	loading.value = false

	hideMakeProposal()
}

const isItMyProject = computed(() => project.value.buyer === authStore.user.id)
const isAlreadyProposed = computed(() => {
	const proposals = project.value.expand?.proposals ?? []
	const proposal = proposals.find(proposal => proposal.user === authStore.user.id)

	return proposal !== undefined
})

const created = computed(() => new Date(project.value.created))
const deadline = computed(() => new Date(project.value.deadline))

const deleteConfirmationModal = reactive<{
	show: boolean
}>({
	show: false
})
const showDeleteConfirmation = () => (deleteConfirmationModal.show = true)
const hideDeleteConfirmation = () => (deleteConfirmationModal.show = false)
</script>