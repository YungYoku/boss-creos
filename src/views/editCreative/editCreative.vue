<template>
	<Grid
		v-if="isAvailable"
		vertical
		:columns="1"
		gap="l"
		class="new-creative"
	>
		<Island>
			<Grid vertical>
				<Text
					size="m"
					:loading="loading"
					class="new-creative__title"
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
							:clearable="false"
							label="Вид крео"
						/>

						<Switcher
							v-model="creative.watermark.value"
							:disabled="loading"
							:error="creative.watermark.error"
							label="Водяной знак"
						/>

						<InputImage
							v-model="creative.preview.value"
							:disabled="loading"
							:error="creative.preview.error"
							accept=".gif,.jpg,.jpeg,.png,.webp"
							label="Обложка"
						/>

						<SelectLive
							v-model="creative.unavailableGeo.value"
							:disabled="loading"
							multiple
							:error="creative.unavailableGeo.error"
							label="Недоступные гео"
							api="geo"
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

						<Switcher
							v-model="creative.resize.value"
							:disabled="loading"
							:error="creative.resize.error"
							label="Ресайз"
						/>

						<Button
							v-if="creative.resize.value"
							:disabled="loading"
							@click="modalShowing = true"
						>
							Ресайз
						</Button>

						<Switcher
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

						<InputVideo
							v-model="creative.video.value"
							:disabled="loading"
							:error="creative.video.error"
							accept=".mp4,.avi,.mov,.3gp"
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
					class="new-creative__submit"
					@click="update"
				>
					Отправить на модерацию
				</Button>
			</Grid>
		</Island>
	</Grid>

	<div v-else>
		Креатив с ID {{ id }} не существует или был создан не вами
	</div>

	<Modal
		v-if="modalShowing"
		:width="585"
		@close="modalShowing = false"
	>
		<Grid>
			<template
				v-for="item in ratioItems"
				:key="item.id"
			>
				<Input
					v-if="creative.resizePrices.value?.[item.name]"
					v-model="creative.resizePrices.value[item.name].value"
					:disabled="loading"
					:error="creative.resizePrices.value[item.name]?.error"
					:label="`Цена ресайза ${item.name}`"
					type="number"
				/>
			</template>
		</Grid>
	</Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/stores/toast.ts'
import { useAuthStore } from '@/stores/auth.ts'

import { Grid, Island, Modal } from '@/components/structures'
import { Button, Input, InputImage, InputVideo, Select, SelectLive, Switcher, Textarea } from '@/components/blocks'
import { Form, Http } from '@/plugins'
import { Text } from '@/components/elements'
import { creativeTypeItems, emptyCreative, ICreative, ratioItems } from '@/interfaces/Creative.ts'

const creativeBase = Form<ICreative>({ ...emptyCreative })
const creative = Form<ICreative>({ ...emptyCreative })

const auth = useAuthStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()
const { id } = route.params

const isAvailable = ref(true)

const loading = ref(true)
const loadCreative = async () => {
	if (!id) return

	loading.value = true
	isAvailable.value = true

	await Http
		.get<ICreative>(`/collections/creatives/records/${id}`)
		.then(response => {
			if (response.creator !== auth.user.id) {
				isAvailable.value = false
			}

			creativeBase.set(response)
			creative.set(response)
		})
		.catch(() => {
			isAvailable.value = false
		})

	loading.value = false
}
loadCreative()

type ReadOnlyCreativeFields = 'id' | 'collectionId' | 'collectionName' | 'created' | 'proposals' | 'changes' | 'expand'
const getChanges = () => {
	const currentCreative = creativeBase.get()
	const updatedCreative = creative.get()

	const readonlyFields: Array<keyof ICreative> = ['id', 'collectionId', 'collectionName', 'created', 'proposals', 'changes', 'expand'] as const
	const currentCreativeKeys = Object.keys(currentCreative) as Array<keyof ICreative>
	const filteredKeys = currentCreativeKeys.filter(key => !readonlyFields.includes(key)) as Array<keyof Omit<ICreative, ReadOnlyCreativeFields>>

	const changes: Record<string, unknown> = {}
	for (const key of filteredKeys) {
		const currentValue = currentCreative[key]
		const newValue = updatedCreative[key]
		if (currentValue !== newValue && newValue != undefined) {
			changes[key] = newValue
		}
	}

	return changes
}

const update = async () => {
	if (JSON.stringify(creativeBase.get()) === JSON.stringify(creative.get())) {
		toast.set('Никаких изменений не было применено')

		return
	}

	loading.value = true
	creative.clearErrors()

	await Http
		.patch<ICreative>(`/collections/creatives/records/${creativeBase.id.value}`, {
			...creativeBase.get(),
			status: 'moderation',
			changes: getChanges()
		})
		.then(response => {
			router.push(`/creative/${response.id}`)
		})
		.catch(({ data }) => {
			creative.setErrors(data)

			toast.set('Ошибка при обновлении креатива')

			loading.value = false
		})
}

const modalShowing = ref(false)
</script>

<style scoped lang="scss">
.new-creative {
	max-width: 585px;

	&__title {
		margin: 0 auto 20px auto;
	}

	&__submit {
		margin: 0 auto;
	}
}
</style>