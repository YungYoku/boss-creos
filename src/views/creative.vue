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
				{{ creative.title }}
			</PageTitle>

			<template v-if="!loading">
				<Button
					v-if="(authStore.isAdmin || isItMyProject)"
					:disabled="loading"
					variant="destructive"
					@click="showDeleteConfirmation"
				>
					Удалить
				</Button>

				<Button
					v-if="isItMyProject"
					:to="`/creative/${creative.id}/edit`"
					:disabled="loading"
				>
					Редактировать
				</Button>

				<template v-else-if="authStore.isExecutor">
					<span/>
					<span v-if="isAlreadyProposed"/>
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

		<Grid :columns="['400px', 1]">
			<CreativeCard
				:creative="creative"
				can-buy
			/>

			<div class="creative__info">
				<div class="creative__name">
					Название
				</div>

				<div class="creative__name">
					Описание
				</div>
			</div>
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
		:default-price="creative.price"
		@make-proposal="makeProposal"
		@close="hideMakeProposal"
	/>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import { Grid } from '@/components/structures'
import { ModalDeleteConfirmation, ModalMakeProposal } from '@/components/sections'
import { Button, } from '@/components/blocks'
import { PageTitle } from '@/components/elements'
import { Http } from '@/plugins'
import { emptyCreative, ICreative, ICreativeProposal } from '@/interfaces/Creative.ts'
import CreativeCard from '@/components/blocks/creativeCard.vue'

const router = useRouter()

const creative = ref<ICreative>({ ...emptyCreative })
const route = useRoute()
const { id } = route.params

const loading = ref(true)
const loadProject = async () => {
	if (!id) return

	await Http
		.get<ICreative>(`/collections/creatives/records/${id}`, {
			expand: ['creator', 'preview']
		})
		.then(response => {
			creative.value = response
		})

	loading.value = false
}
loadProject()

const remove = async () => {
	if (loading.value) return

	await Http
		.delete(`/collections/creatives/records/${creative.value.id}`)
		.then(() => {
			router.push('/')
		})
}

const authStore = useAuthStore()
const toast = useToast()


const makeProposalModal = reactive<{
	show: boolean
}>({
	show: false,
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
const hideMakeProposal = () => makeProposalModal.show = false
const makeProposal = async (proposal: ICreativeProposal) => {
	loading.value = true

	await Http
		.post<ICreative>(`/make-proposal/${creative.value.id}`, {
			price: proposal.price,
			text: proposal.text
		})
		.then((response) => {
			creative.value = response

			authStore.setEnergy(authStore.user.energy - 1)

			toast.set('Вы успешно откликнулись')
		})

	loading.value = false

	hideMakeProposal()
}

const isItMyProject = computed(() => creative.value.creator === authStore.user.id)
const isAlreadyProposed = computed(() => {
	const proposals = creative.value.expand?.proposals ?? []
	const proposal = proposals.find(proposal => proposal.user === authStore.user.id)

	return proposal !== undefined
})

const deleteConfirmationModal = reactive<{
	show: boolean
}>({
	show: false,
})
const showDeleteConfirmation = () => deleteConfirmationModal.show = true
const hideDeleteConfirmation = () => deleteConfirmationModal.show = false
</script>
