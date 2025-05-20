<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Island>
			<Grid vertical>
				<Text
					size="m"
					:loading="loading"
				>
					Добавить креатив
				</Text>

				<Grid :columns="2">
					<Grid vertical>
						<Input
							v-model="creative.price.value"
							:disabled="loading"
							:error="creative.price.error"
							label="Цена"
						/>

						<SelectLive
							v-model="creative.geo.value"
							:disabled="loading"
							:error="creative.geo.error"
							label="Гео"
							api="geo"
						/>

						<SelectLive
							v-model="creative.slot.value"
							:disabled="loading"
							:error="creative.slot.error"
							label="Слот"
							api="slots"
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
					</Grid>

					<Grid vertical>
						<Select
							v-model="creative.ratio.value"
							:disabled="loading"
							:error="creative.ratio.error"
							:items="ratioItems"
							label="Размер"
						/>

						<Checkbox
							v-model="creative.resize.value"
							:disabled="loading"
							:error="creative.resize.error"
							label="Ресайз"
						/>

						<Input
							v-if="creative.resize.value"
							v-model="creative.resizePrice.value"
							:disabled="loading"
							:error="creative.resizePrice.error"
							label="Цена ресайза"
						/>

						<Checkbox
							v-model="creative.reskin.value"
							:disabled="loading"
							:error="creative.reskin.error"
							label="Рескин"
						/>

						<Input
							v-if="creative.reskin.value"
							v-model="creative.reskinPrice.value"
							:disabled="loading"
							:error="creative.reskinPrice.error"
							label="Цена рескина"
						/>

						<SelectLive
							v-model="creative.approach.value"
							:disabled="loading"
							:error="creative.approach.error"
							label="Подход"
							api="approaches"
						/>

						<InputFile
							v-model="creative.video.value"
							:disabled="loading"
							:error="creative.video.error"
							label="Загрузите крео"
						/>
					</Grid>
				</Grid>

				<Textarea
					v-model="creative.description.value"
					:disabled="loading"
					:error="creative.description.error"
					label="Описание"
				/>

				<Button
					:disabled="loading"
					@click="create"
				>
					Отправить на модерацию
				</Button>
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
import { Button, Checkbox, Input, InputFile, Select, Textarea } from '@/components/blocks'
import { Form, Http } from '@/plugins'
import { Text } from '@/components/elements'
import { emptyCreative, ICreative } from '@/interfaces/Creative.ts'
import SelectLive from '@/components/blocks/selectLive.vue'

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

const creativeTypeItems = [
	{ id: 'video', name: 'Video' },
	{ id: 'static', name: 'Static' },
	{ id: 'pwa', name: 'PWA' },
]

const ratioItems = ['1:1', '2:3', '3:2', '3:4', '4:5', '9:16', '16:9']
	.map(item => ({
		id: item,
		name: item
	}))
</script>
