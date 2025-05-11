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
					v-model="creative.price.value"
					:disabled="loading"
					:error="creative.price.error"
					label="Цена"
				/>

				<Select
					v-model="creative.geo.value"
					:disabled="loading"
					:error="creative.geo.error"
					label="Гео"
					:items="geoItems"
				/>

				<Select
					v-model="creative.slot.value"
					:disabled="loading"
					:error="creative.slot.error"
					label="Слот"
				/>

				<Select
					v-model="creative.type.value"
					:disabled="loading"
					:error="creative.type.error"
					:items="creativeTypeItems"
					label="Вид крео"
				/>

				<Checkbox
					v-model="creative.watermark.value"
					:disabled="loading"
					:error="creative.watermark.error"
					label="Водяной знак"
				/>

				<InputFile
					v-model="creative.preview.value"
					:disabled="loading"
					:error="creative.preview.error"
					label="Обложка"
				/>

				<InputFile
					v-model="creative.video.value"
					:disabled="loading"
					:error="creative.video.error"
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
	InputFile,
	Button,
	Checkbox,
	Select
} from '@/components/blocks'
import { Http, Form } from '@/plugins'
import { Text } from '@/components/elements'
import { emptyCreative, ICreative } from '@/interfaces/Creative.ts'

const auth = useAuthStore()

const creative = Form<ICreative>({ ...emptyCreative })

const router = useRouter()
const toast = useToast()

watch(() => auth.user.id, () => creative.creator.value = auth.user.id, { immediate: true })

const loading = ref(false)
const create = async () => {
	if (auth.isPersonalInfoIncomplete) {
		toast.set('Для создания объявления требуется заполнить свои имя и фамилию!')
		return
	}

	loading.value = true
	creative.clearErrors()

	creative.creator.value = auth.user.id

	await Http
		.post<ICreative>('/collections/creatives/records', creative.get())
		.then(response => {
			router.push(`/creative/${response.id}`)
		})
		.catch(({ data }) => {
			creative.setErrors(data)

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
