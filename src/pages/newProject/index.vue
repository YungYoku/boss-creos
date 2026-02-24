<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Grid :columns="[1, '100px']">
			<Input
				v-model.trim="project.title.value"
				:disabled="loading"
				:error="project.title.error"
				label="Название"
			/>

			<Button
				:disabled="loading"
				@click="create"
			>
				Создать
			</Button>
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

					<Input
						v-model="project.price.value"
						:disabled="loading"
						:error="project.price.error"
						label="Цена"
					/>
					<InputFile
						v-model="project.file.value"
						:error="project.file.error"
						:loading="loading"
					/>

					<DatePicker
						v-model="project.deadline.value"
						:error="project.deadline.error"
						label="Срок сдачи"
					/>
				
					<Checkbox
						v-model="project.tutoring.value"
						:error="project.tutoring.error"
						label="Репетиторство"
					/>
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

					<Textarea
						v-model.trim="project.description.value"
						:error="project.description.error"
						height="200px"
						label="Описание"
					/>
				</Grid>
			</Island>
		</Grid>
	</Grid>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import { Grid, Island } from '@/components/structures'
import { Button, Checkbox, DatePicker, Input, InputFile, Textarea } from '@/components/blocks'
import { emptyProject, type IProject } from '@/types/project'
import { Form, Http } from '@/plugins'
import { Text } from '@/components/elements'
import { isHttpError } from '@/plugins/http'

const auth = useAuthStore()

const project = Form<IProject>({ ...emptyProject })

const router = useRouter()
const toast = useToast()

watch(() => auth.user.id, () => project.buyer.value = auth.user.id, { immediate: true })

const loading = ref(false)
const create = async () => {
	if (auth.isPersonalInfoIncomplete) {
		toast.set('Для создания объявления требуется заполнить свои имя и фамилию!')
		return
	}

	loading.value = true
	project.clearErrors()

	project.title_lowercase.value = project.title.value
	project.description_lowercase.value = project.description.value

	await Http
		.post<IProject>('/collections/projects/records', project.get())
		.then(response => {
			void router.push(`/project/${response.id}`)
		})
		.catch((error: unknown) => {
			if (isHttpError(error)) {
				project.setErrors(error.data)
			}

			toast.set('Ошибка при создании объявления')

			loading.value = false
		})
}
</script>
