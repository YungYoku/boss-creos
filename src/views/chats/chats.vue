<template>
	<Grid :columns="headerColumns">
		<Icon
			v-if="Screen.isSize('s') && isChatOpened"
			name="arrow-left"
			size="l"
			@click="openedChat = null"
		/>

		<PageTitle>
			Мои чаты
		</PageTitle>
	</Grid>

	<Grid :columns="Screen.isLarger('s') ? [1,4] : 1 ">
		<Island v-if="Screen.isLarger('s') || !isChatOpened">
			<Grid
				vertical
				:columns="1"
			>
				<Grid
					v-for="chat in chats"
					:key="chat.id"
					gap="xs"
					class="chats__item"
					:class="{
						'_active': openedChat?.chat === chat.chat
					}"
					vertical
					:columns="1"
					@click="loadChat(chat)"
				>
					<Text size="s">
						{{ chat.title }}
					</Text>

					<UserCard
						:loading="loading"
						:user="getUserForChar(chat)"
					/>
				</Grid>
			</Grid>
		</Island>

		<Island v-if="(Screen.isSize('s') && isChatOpened) || Screen.isLarger('s')">
			<Text v-if="!isChatOpened">
				Выберите чат
			</Text>
			<Chat
				v-else-if="openedChat !== null"
				:project="openedChat"
				:rating-type="chatRatingType"
				:user-type="chatUserType"
				@update:status="updateStatus"
				@update:rating="updateRating"
			/>
		</Island>
	</Grid>
</template>

<script setup lang="ts">
import { Chat } from '@/components/sections'
import { User as UserCard } from '@/components/blocks'
import { Icon, PageTitle } from '@/components/elements'
import { Grid, Island } from '@/components/structures'
import { IProject, IProjects, IProjectStatus } from '@/types/Project.ts'

import { Http, Screen } from '@/plugins'
import { computed, Ref, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import Text from '@/components/elements/text/text.vue'
import { IRating } from '@/types/Rating.ts'
import { emptyUser } from '@/types/User.ts'

const auth = useAuthStore()
const openedChat: Ref<IProject | null> = ref(null)
const isChatOpened = computed(() => openedChat.value !== null)
const headerColumns = computed(() => {
	if (Screen.isSize('s') && isChatOpened.value) {
		return ['40px', 1]
	}
	return 1
})
const chats: Ref<Array<IProject>> = ref([])
const loading = ref(true)

const chatRatingType = computed(() => auth.isBuyer ? 'ratingDesigner' : 'ratingBuyer')
const getUserForChar = (chat: IProject) => {
	if (loading.value) return emptyUser

	const designer = chat.expand?.designer
	const buyer = chat.expand?.buyer
	if (designer && buyer) {
		return auth.isBuyer ? designer : buyer
	}

	return emptyUser
}
const chatUserType = computed(() => auth.isBuyer ? 'designer' : 'buyer')

const getChats = async () => {
	if (auth.user.id === '') return
	loading.value = true

	const filter = auth.isBuyer ? `buyer='${auth.user.id}'` : `designer='${auth.user.id}'`
	const encodedFilter = encodeURIComponent(`(${filter} && status!='created')`)

	await Http.get<IProjects>('/collections/projects/records', {
		filter: `(${encodedFilter})`,
		expand: ['proposals', 'type', 'discipline', 'buyer', 'ratingBuyer', 'designer', 'ratingDesigner']
	})
		.then(({ items }) => {
			chats.value = items
		})

	loading.value = false
}
watch(() => auth.user.id, getChats, { immediate: true })

const updateStatus = async (status: IProjectStatus) => {
	if (openedChat.value) {
		openedChat.value.status = status
	}
}

const updateRating = async (rating: IRating) => {
	if (openedChat.value && openedChat.value.expand) {
		if (auth.isBuyer) {
			openedChat.value.ratingDesigner = rating.id
			openedChat.value.expand.ratingDesigner = rating
		} else if (auth.isDesigner) {
			openedChat.value.ratingBuyer = rating.id
			openedChat.value.expand.ratingBuyer = rating
		}
	}
}

const loadChat = (project: IProject) => {
	openedChat.value = project
}
</script>

<style scoped lang="scss">
.chats {
	&__item {
		padding: 8px 16px;

		border-radius: 8px;

		cursor: pointer;

		&:hover {
			background-color: hsl(var(--card));
		}

		&._active {
			background-color: hsl(var(--card));
		}
	}
}
</style>