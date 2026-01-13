<template>
	<StepByStep
		:key="project.id"
		class="chat"
	>
		<template #step_1="{ next }">
			<Grid
				vertical
				:columns="1"
			>
				<Grid
					:columns="[0, 1, 0]"
					ver-align="center"
				>
					<User
						v-if="chatMember"
						:loading="loading"
						link
						:user="chatMember"
					/>

					<span/>

					<Badge
						v-if="auth.isDesigner && project.status === 'on_review'"
						bg="yellow"
					>
						Проверяется
					</Badge>
					<Badge
						v-if="project.status === 'ended'"
						bg="green"
					>
						Завершено
					</Badge>
					<span v-else/>
				</Grid>

				<div
					ref="messages-ref"
					class="chat__messages"
				>
					<Message
						v-for="message in chat.expand?.messages ?? []"
						:key="message.id"
						:message="message"
						:self="message.user === auth.user.id"
					/>
				</div>

				<Grid vertical>
					<Badge v-if="fileName">
						Прикреплен файл {{ fileName }}
					</Badge>
					<Grid
						:columns="['54px', 1]"
						gap="xs"
					>
						<InputFile
							v-model="file"
							:loading="loading"
							compact
							@update:name="value => fileName = value"
						/>

						<Input
							v-model="newMessage"
							:disabled="loading"
							:loading="loading"
							label="Cообщение"
							icon="send"
							@action="sendMessage"
							@keyup.enter="sendMessage"
						/>
					</Grid>
				</Grid>

				<Button
					v-if="auth.isDesigner && project.status === 'in_progress'"
					:loading="loading"
					@click="sendToReview"
				>
					Отправить на проверку
				</Button>

				<Grid
					v-if="auth.isBuyer && project.status === 'on_review'"
					:columns="[1, 1]"
				>
					<Button
						:loading="loading"
						variant="destructive"
						@click="declineReview"
					>
						Отказ
					</Button>
					<Button
						:loading="loading"
						variant="positive"
						@click="approveReview"
					>
						Подтвердить выполнение
					</Button>
				</Grid>

				<template v-if="project.status === 'ended'">
					<Button
						v-if="rating"
						@click="next"
					>
						Просмотр отзыва
					</Button>
					<Button
						v-else
						@click="next"
					>
						Оставить отзыв
					</Button>
				</template>
			</Grid>
		</template>

		<template #step_2="{back}">
			<Rating
				v-if="project.status === 'ended' && chatMember?.username"
				v-model="newRating"
				:user="chatMember.username"
				:loading="loading"
				@update:model-value="sendRating"
				@back="back"
			/>
		</template>
	</StepByStep>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, type Ref, useTemplateRef, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import { Grid, StepByStep } from '@/components/structures'
import { Rating } from '@/components/sections'
import { Button, Input, InputFile, User } from '@/components/blocks'
import { Badge } from '@/components/elements'
import { Http } from '@/plugins'
import type { IMessage } from '@/types/message'
import type { IChat } from '@/types/chat'
import { type IProject, type IProjectStatus } from '@/types/project'
import type { IRating } from '@/types/rating'

import { Message } from './components'

const toast = useToast()

interface Props {
	project: IProject,
	userType: 'designer' | 'buyer'
	ratingType: 'ratingDesigner' | 'ratingBuyer'
}
const props = withDefaults(defineProps<Props>(), {})

const messagesRef = useTemplateRef('messages-ref')
const chat: Ref<IChat> = ref({
	created: '',
	id: '',
	messages: [],
	collectionId: '',
	collectionName: '',
	updated: '',
	expand: {
		messages: []
	}
})

const loading = ref(true)

const chatMember = computed(() => props.project.expand?.[props.userType])
const rating = computed(() => props.project.expand?.[props.ratingType] ?? null)

const loadChat = () => {
	Http.connect<IChat>({
		collection: 'chats',
		id: props.project.chat,
		expand: ['messages', 'messages.file'],
		cb: async response => {
			chat.value = response

			await nextTick(() => {
				if (messagesRef.value) {
					const messagesRefScrollHeight = messagesRef.value.scrollHeight ?? 0
					messagesRef.value.scrollTo(0, messagesRefScrollHeight) // Не всегда срабатывает с первого раза
				}

				loading.value = false
			})
		}
	})
}

watch(() => props.project.chat, loadChat, { immediate: true })
watch(() => props.project.status, () => { loading.value = false })

const auth = useAuthStore()

const newMessage = ref('')
const file: Ref<string | null> = ref(null)
const fileName: Ref<string | null> = ref(null)
const sendMessage = async () => {
	if (loading.value) return
	if (newMessage.value.length === 0 && file.value === null) return

	loading.value = true

	await Http
		.post<IMessage>(`/send-message/${props.project.chat}`, {
			text: newMessage.value,
			file: file.value
		})

	newMessage.value = ''
	file.value = null
	loading.value = false
}

const emit = defineEmits(['update:status', 'update:rating'])

const updateStatus = async (status: IProjectStatus) => {
	loading.value = true

	const body: IProject = {
		...props.project,
		status
	}

	await Http
		.patch<IProject>(`/collections/projects/records/${props.project.id}`, body)
		.then((response) => {
			emit('update:status', response.status)
		})

	loading.value = false
}

const declineReview = () => updateStatus('in_progress')
const sendToReview = () => updateStatus('on_review')
const approveReview = () => updateStatus('ended')

const newRating: Ref<IRating> = ref({
	by: '',
	collectionId: '',
	collectionName: '',
	created: '',
	id: '',
	updated: '',
	stars: 0,
	review: ''
})
watch(rating, () => {
	if (rating.value) newRating.value = rating.value
}, { immediate: true })

const sendRating = async (value: { stars: number, review: string } = { stars: 1, review: '' }) => {
	const { stars, review } = value

	await Http.post<IRating>(`/send-review/${props.project.id}`, {
		stars,
		review
	})
		.then((response) => {
			emit('update:rating', response)

			toast.set('Отзыв оставлен!')
		})
}
</script>

<style scoped lang="scss">
.chat {
	&__messages {
		display: flex;
		flex-direction: column;

		height: 40vh;
		min-height: 300px;
		max-height: 800px;
		padding: 0 10px;
		overflow: auto;
		gap: 10px;
	}
}
</style>
