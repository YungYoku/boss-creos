<template>
	<Island class="project">
		<div class="project__actions">
			<template v-if="project.designer && showingChat">
				<Skeleton
					v-if="loading"
					width="24px"
					height="24px"
				/>
				<div
					v-else
					@click="openChat"
				>
					<Icon
						name="comment-dots"
						size="s"
					/>
				</div>
			</template>

			<template v-else-if="project.proposals && showingProposals">
				<Skeleton
					v-if="loading"
					width="24px"
					height="24px"
				/>
				<div
					v-else
					class="project__proposals"
					@click="showProposals"
				>
					<Icon
						name="user"
						size="s"
					/>
					{{ project.proposals.length }}
				</div>
			</template>

			<template v-if="authStore.isDesigner">
				<Skeleton
					v-if="loading"
					width="24px"
					height="24px"
				/>
				<div
					v-else
					@click="addToFavorite"
				>
					<Icon
						:name="
							authStore.user.favorite.includes(project.id) ? 'heart-active' : 'heart'
						"
						size="s"
					/>
				</div>
			</template>
			<template v-if="showingRemove && project.status === 'created'">
				<Skeleton
					v-if="loading"
					width="24px"
					height="24px"
				/>
				<div
					v-else
					@click="remove"
				>
					<Icon
						name="trash"
						size="s"
					/>
				</div>
			</template>
		</div>

		<Skeleton
			v-if="loading"
			width="200px"
			height="32px"
		/>
		<router-link
			v-else
			:to="`/project/${project.id}`"
			class="project__title"
		>
			<Text size="m">
				{{ project.title }}
			</Text>
		</router-link>

		<div
			v-if="!loading"
			class="project__info"
		>
			<Badge> {{ project.price }} ₽ </Badge>
			<Badge v-if="showingStatus && status">
				{{ status }}
			</Badge>
		</div>

		<Text
			class="project__description"
			size="xs"
			:loading
			loading-width="140px"
		>
			{{ project.description }}
		</Text>

		<div class="project__footer">
			<User
				v-if="project?.expand?.buyer"
				:loading
				class="project__user"
				link
				:user="project.expand.buyer"
			/>

			<Text
				size="xs"
				:loading
				loading-width="100px"
			>
				Дедлайн: {{ $date(deadline) }}
			</Text>
		</div>
	</Island>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Island } from '@/components/structures'
import { Badge, Icon, Skeleton, Text } from '@/components/elements'
import User from '../user/user.vue'
import { Http } from '@/plugins'
import { useAuthStore } from '@/stores/auth'
import type { IProject } from '@/types/project'

interface Props {
	project: IProject
	showingProposals?: boolean
	showingChat?: boolean
	showingRemove?: boolean
	showingStatus?: boolean
	loading?: boolean
}

const {
	project,
	showingProposals = false,
	showingChat = false,
	showingRemove = false,
	showingStatus = false,
	loading = false
} = defineProps<Props>()

const authStore = useAuthStore()

const emit = defineEmits(['show-proposals', 'show-chat', 'add-to-favorite', 'remove'])

const showProposals = () => {
	emit('show-proposals', project)
}
const openChat = () => {
	emit('show-chat', project)
}
const addToFavorite = async () => {
	const newFavorite = authStore.user.favorite.includes(project.id)
		? authStore.user.favorite.filter(id => id !== project.id)
		: [...authStore.user.favorite, project.id]

	await Http.patch(`/collections/users/records/${authStore.user.id}`, {
		favorite: newFavorite
	}).then(() => {
		authStore.setUser({ ...authStore.user, favorite: newFavorite })
	})
}
const remove = () => {
	emit('remove', project)
}

const status = computed(() => {
	switch (project.status) {
		case 'created':
			return 'Создано'
		case 'in_progress':
			return 'В работе'
		case 'on_review':
			return 'На проверке'
		case 'ended':
			return 'Завершено'
		default:
			return null
	}
})

const deadline = computed(() => new Date(project.deadline))
</script>

<style scoped>
.project {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	max-width: 100%;
	height: 240px;
	overflow: hidden;
	background-color: hsl(var(--primary-foreground));
	gap: 10px;

	.project__actions {
		position: absolute;
		top: 10px;
		right: 10px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.project__proposals {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
		cursor: pointer;
	}

	.project__title {
		max-width: 100%;
		max-height: 32px;
		padding-right: 48px;
	}

	.project__title,
	.project__description {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.project__description {
		max-height: 64px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.project__info {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding-right: 48px;
	}

	.project__footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin: auto 0 0;
	}
}
</style>