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
						:name="authStore.user.favorite.includes(project.id) ? 'heart-active' : 'heart'"
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
			<Text
				size="m"
				:title="project.title"
			>
				{{ project.title }}
			</Text>
		</router-link>

		<div
			v-if="!loading"
			class="project__info"
		>
			<Badge
				bg="purple"
				variant="secondary"
			>
				{{ project.price }} ₽
			</Badge>
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
				v-if="project?.expand?.creator"
				:loading
				class="project__user"
				link
				:user="project.expand.creator"
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
import { computed, PropType } from 'vue'

import { Island } from '@/components/structures'
import { Icon, Badge, Skeleton, Text } from '@/components/elements'
import User from './user.vue'
import { Http } from '@/plugins'
import { useAuthStore } from '@/stores/auth.ts'
import { IProject } from '@/interfaces/Project.ts'

const props = defineProps({
	project: {
		type: Object as PropType<IProject>,
		required: true
	},
	showingProposals: {
		type: Boolean,
		default: false
	},
	showingChat: {
		type: Boolean,
		default: false
	},
	showingRemove: {
		type: Boolean,
		default: false
	},
	showingStatus: {
		type: Boolean,
		default: false
	},
	loading: {
		type: Boolean,
		default: false
	}
})

const authStore = useAuthStore()

const emit = defineEmits(['show-proposals', 'show-chat', 'add-to-favorite', 'remove'])

const showProposals = () => emit('show-proposals', props.project)
const openChat = () => emit('show-chat', props.project)
const addToFavorite = async () => {
	const newFavorite = authStore.user.favorite.includes(props.project.id)
		? authStore.user.favorite.filter(id => id !== props.project.id)
		: [...authStore.user.favorite, props.project.id]

	await Http
		.patch(`/collections/users/records/${authStore.user.id}`, {
			favorite: newFavorite
		})
		.then(() => authStore.setUser({ ...authStore.user, favorite: newFavorite }))
}
const remove = () => emit('remove', props.project)

const status = computed(() => {
	switch (props.project?.status) {
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

const deadline = computed(() => new Date(props.project?.deadline))
</script>

<style scoped lang="scss">
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

	&__actions {
		position: absolute;
		top: 10px;
		right: 10px;

		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&__proposals {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;

		cursor: pointer;
	}

	&__title {
		max-width: 100%;
		max-height: 32px;
		padding-right: 48px;
	}

	&__title,
	&__description {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	&__description {
		max-height: 64px;
		overflow: hidden;

		text-overflow: ellipsis;
	}

	&__info {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;

		padding-right: 48px;
	}

	&__footer {
		display: flex;
		justify-content: space-between;
		align-items: center;

		width: 100%;
		margin: auto 0 0 0;
	}
}
</style>
