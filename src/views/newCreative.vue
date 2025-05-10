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
			</Grid>
		</Island>
	</Grid>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import { Grid, Island } from '@/components/structures'
import {
	Input,
	Button,
} from '@/components/blocks'
import { Http, Form } from '@/plugins'
import { Text } from '@/components/elements'
import { emptyCreative, ICreative } from '@/interfaces/Creative.ts'

const auth = useAuthStore()

const project = Form<ICreative>({ ...emptyCreative })

const router = useRouter()
const toast = useToast()

watch(() => auth.user.id, () => project.creator.value = auth.user.id, { immediate: true })

const loading = ref(false)
const create = async () => {
	if (auth.isPersonalInfoIncomplete) {
		toast.set('Для создания объявления требуется заполнить свои имя и фамилию!')
		return
	}

	loading.value = true
	project.clearErrors()

	await Http
		.post<ICreative>('/collections/creatives/records', project.get())
		.then(response => {
			router.push(`/creative/${response.id}`)
		})
		.catch(({ data }) => {
			project.setErrors(data)

			toast.set('Ошибка при создании объявления')

			loading.value = false
		})
}
</script>
