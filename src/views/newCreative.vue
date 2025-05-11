<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Grid :columns="[1, '100px']">
			<div/>

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
					Добавить креатив
				</Text>

				<Input
					v-model="project.price.value"
					:disabled="loading"
					:error="project.price.error"
					label="Цена"
				/>

				<Select
					v-model="project.geo.value"
					:disabled="loading"
					:error="project.geo.error"
					label="Гео"
					:items="geoItems"
				/>

				<Select
					v-model="project.slot.value"
					:disabled="loading"
					:error="project.slot.error"
					label="Слот"
				/>

				<Select
					v-model="project.type.value"
					:disabled="loading"
					:error="project.type.error"
					:items="creativeTypeItems"
					label="Вид крео"
				/>

				<Input
					v-model="project.price.value"
					:disabled="loading"
					:error="project.price.error"
					label="Водяной знак"
				/>

				<Input
					v-model="project.price.value"
					:disabled="loading"
					:error="project.price.error"
					label="Обложка"
				/>

				<Input
					v-model="project.price.value"
					:disabled="loading"
					:error="project.price.error"
					label="Креатив"
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
	Select
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

const geoItems = [
	{ id: '0', name: 'Ru' }
]

const creativeTypeItems = [
	{ id: 'video', name: 'Video' },
	{ id: 'static', name: 'Static' },
	{ id: 'pwa', name: 'PWA' },
]
</script>
