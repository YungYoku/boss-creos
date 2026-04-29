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
import { ref, warn } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/stores/toast'

import { Grid, Island } from '@/components/structures'
import { Button, Checkbox, DatePicker, Input, InputFile, Textarea } from '@/components/blocks'
import { Text } from '@/components/elements'
import { emptyProject, type IProject } from '@/types/project'
import type { IUser } from '@/types/user'
import { Form, Http } from '@/plugins'
import { isHttpError } from '@/plugins/http'
import { AUTH, BUYER } from '@/data/permissions'

definePage({
	meta: {
		permissions: [AUTH, BUYER]
	}
})

const form = Form<IProject>({ ...emptyProject })

const router = useRouter()
const route = useRoute()

const getID = () => {
	return route.params.id
}

const loading = ref(true)
const loadProject = async () => {
	const id = getID()
	if (!id) return
	if (Array.isArray(id)) {
		warn('ID is array for some reason.')
		return
	}

	loading.value = true

	await Http.get<IProject>(`/collections/projects/records/${id}`).then(response => {
		form.set(response)
	})

	loading.value = false
}
void loadProject()

const toast = useToast()
const save = async () => {
	const id = getID()
	if (!id) return
	if (Array.isArray(id)) {
		warn('ID is array for some reason.')
		return
	}

	loading.value = true
	form.clearErrors()

	form.title_lowercase.value = form.title.value
	form.description_lowercase.value = form.description.value

	await Http.patch<IUser>(`/collections/projects/records/${form.id.value}`, form.get())
		.then(() => {
			void router.push(`/project/${id}`)

			toast.set('Сохранено успешно!')
		})
		.catch((error: unknown) => {
			if (isHttpError(error)) {
				form.setErrors(error.data)
			}

			toast.set('Ошибка сохранения')
		})

	loading.value = false
}
</script>