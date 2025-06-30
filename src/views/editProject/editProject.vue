<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Grid :columns="[1, '80px', '100px']">
			<Input
				v-model.trim="form.title.value"
				:error="form.title.error"
				:disabled="loading"
				label="Название"
			/>

			<Button
				:disabled="loading"
				:to="`/project/${form.id.value}`"
			>
				Назад
			</Button>

			<Button
				:disabled="loading"
				@click="save"
			>
				Сохранить
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
						v-model="form.price.value"
						:error="form.price.error"
						:disabled="loading"
						label="Цена"
					/>

					<InputFile
						v-model="form.file.value"
						:error="form.file.error"
						:loading="loading"
					/>

					<DatePicker
						v-model="form.deadline.value"
						:error="form.deadline.error"
						label="Срок сдачи"
					/>

					<Checkbox
						v-model="form.tutoring.value"
						:error="form.tutoring.error"
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
						v-model.trim="form.description.value"
						:error="form.description.error"
						height="200px"
						label="Описание"
					/>
				</Grid>
			</Island>
		</Grid>
	</Grid>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/stores/toast.ts'

import { Grid, Island } from '@/components/structures'
import { Button, Checkbox, DatePicker, Input, InputFile, Textarea } from '@/components/blocks'
import { Text } from '@/components/elements'
import { emptyProject, IProject } from '@/interfaces/Project.ts'
import { IUser } from '@/interfaces/User.ts'
import { Form, Http } from '@/plugins'

const form = Form<IProject>({ ...emptyProject })

const router = useRouter()
const route = useRoute()
const { id } = route.params

const loading = ref(true)
const loadProject = async () => {
	if (!id) return
	loading.value = true

	await Http
		.get<IProject>(`/collections/projects/records/${id}`, {
			expand: ['creator', 'designer', 'discipline', 'type', 'university']
		})
		.then(response => {
			form.set(response)
		})

	loading.value = false
}
loadProject()

const toast = useToast()
const save = async () => {
	loading.value = true
	form.clearErrors()

	form.title_lowercase.value = form.title.value
	form.description_lowercase.value = form.description.value

	await Http
		.patch<IUser>(`/collections/projects/records/${form.id.value}`, form.get())
		.then(() => {
			router.push(`/project/${id}`)

			toast.set('Сохранено успешно!')
		})
		.catch(({ data }) => {
			form.setErrors(data)

			toast.set('Ошибка сохранения')
		})

	loading.value = false
}
</script>
