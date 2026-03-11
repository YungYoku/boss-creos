<template>
	<Grid v-if="isAvailable" vertical :columns="1" gap="l" class="edit-creative">
		<Island>
			<Grid vertical>
				<Text size="m" :loading="loading" class="edit-creative__title">
					Добавить креатив
				</Text>

				<Grid :columns="2">
					<Grid vertical>
						<InputRich
							v-model="creative.price.value"
							:disabled="loading"
							:error="creative.price.error"
							type="number"
							label="Цена"
						/>

						<SelectLiveRich
							v-model="creative.geo.value"
							:disabled="loading"
							:error="creative.geo.error"
							label="Гео"
							api="geo"
						/>

						<SelectLiveRich
							v-model="creative.slot.value"
							:disabled="loading"
							:error="creative.slot.error"
							label="Слот"
							api="slots"
						/>

						<SelectRich
							v-model="creative.type.value"
							:disabled="loading"
							:error="creative.type.error"
							:items="creativeTypeItems"
							:clearable="false"
							label="Вид крео"
						/>

						<SwitcherRich
							v-model="creative.watermark.value"
							:disabled="loading"
							:error="creative.watermark.error"
							label="Водяной знак"
						/>

						<InputImageRich
							v-model="creative.preview.value"
							:disabled="loading"
							:error="creative.preview.error"
							accept=".gif,.jpg,.jpeg,.png,.webp"
							:label="creative.type.value === 'static' ? 'Загрузите крео' : 'Обложка'"
						/>

						<SelectLiveRich
							v-model="creative.unavailableGeo.value"
							:disabled="loading"
							multiple
							:error="creative.unavailableGeo.error"
							label="Недоступные гео"
							api="geo"
						/>
					</Grid>

					<Grid vertical>
						<SelectRich
							v-model="creative.ratio.value"
							:disabled="loading"
							:error="creative.ratio.error"
							:items="ratioItems"
							label="Размер"
						/>

						<SwitcherRich
							v-model="creative.resize.value"
							:disabled="loading"
							:error="creative.resize.error"
							label="Ресайз"
						/>

						<Button
							v-if="creative.resize.value"
							:disabled="loading"
							variant="outline"
							@click="modalShowing = true"
						>
							Ресайз
						</Button>

						<SwitcherRich
							v-model="creative.reskin.value"
							:disabled="loading"
							:error="creative.reskin.error"
							label="Рескин"
						/>

						<InputRich
							v-if="creative.reskin.value"
							v-model="creative.reskinPrice.value"
							:disabled="loading"
							:error="creative.reskinPrice.error"
							label="Цена рескина"
						/>

						<SelectLiveRich
							v-if="creative.type.value !== 'static'"
							v-model="creative.approach.value"
							:disabled="loading"
							:error="creative.approach.error"
							label="Подход"
							api="approaches"
						/>

						<InputVideoRich
							v-if="creative.type.value !== 'static'"
							v-model="creative.video.value"
							:disabled="loading"
							:error="creative.video.error"
							accept=".mp4,.avi,.mov,.3gp"
							label="Загрузите крео"
						/>
					</Grid>
				</Grid>

				<TextareaRich
					v-model="creative.description.value"
					:disabled="loading"
					:error="creative.description.error"
					label="Описание"
				/>

				<Button
					:disabled="loading"
					class="edit-creative__submit"
					variant="outline"
					@click="update"
				>
					Отправить на модерацию
				</Button>
			</Grid>
		</Island>
	</Grid>

	<div v-else>Креатив с ID {{ getID() }} не существует или был создан не вами</div>

	<Modal v-if="modalShowing" :width="585" @close="modalShowing = false">
		<Grid>
			<template v-for="item in ratioItems" :key="item.id">
				<InputRich
					v-if="creative.resizePrices?.[item.id]"
					v-model="creative.resizePrices[item.id].value"
					:disabled="loading"
					:error="creative.resizePrices[item.id]?.error"
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
import { useToast } from '@/stores/toast'
import { useAuthStore } from '@/stores/auth'

import { Grid, Island, Modal } from '@/components/structures'
import {
	Button,
	InputImageRich,
	InputRich,
	InputVideoRich,
	SelectLiveRich,
	SelectRich,
	SwitcherRich,
	TextareaRich,
} from '@/components/blocks'
import { Form, Http } from '@/plugins'
import { Text } from '@/components/elements'
import { creativeTypeItems, emptyCreative, type ICreative, ratioItems } from '@/types/creative'
import { isHttpError } from '@/plugins/http'
import { AUTH, DESIGNER } from '@/data/permissions'

definePage({
	meta: {
		permissions: [AUTH, DESIGNER],
	},
})

const creativeBase = Form<ICreative>({ ...emptyCreative })
const creative = Form<ICreative>({ ...emptyCreative })

const auth = useAuthStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()

const getID = () => {
	// @ts-expect-error TODO: видимо косяк в vue-router/experimental
	return route.params.id as string
}

const isAvailable = ref(true)

const loading = ref(true)
const loadCreative = async () => {
	const id = getID()
	if (!id || Array.isArray(id)) return

	loading.value = true
	isAvailable.value = true

	await Http.get<ICreative>(`/collections/creatives/records/${id}`)
		.then((response) => {
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
void loadCreative()

type ReadOnlyCreativeFields =
	| 'id'
	| 'collectionId'
	| 'collectionName'
	| 'created'
	| 'proposals'
	| 'changes'
	| 'expand'
const getChanges = () => {
	const currentCreative = creativeBase.get()
	const updatedCreative = creative.get()

	const readonlyFields: (keyof ICreative)[] = [
		'id',
		'collectionId',
		'collectionName',
		'created',
		'proposals',
		'changes',
		'expand',
	] as const
	const currentCreativeKeys = Object.keys(currentCreative) as (keyof ICreative)[]
	const filteredKeys = currentCreativeKeys.filter(
		(key) => !readonlyFields.includes(key),
	) as (keyof Omit<ICreative, ReadOnlyCreativeFields>)[]

	const changes: Record<string, unknown> = {}
	for (const key of filteredKeys) {
		const currentValue = currentCreative[key]
		const newValue = updatedCreative[key]
		if (currentValue !== newValue) {
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

	if (creative.type.value !== 'static') {
		const isNoApproach = !creative.approach.value
		if (isNoApproach) {
			creative.setErrors({
				approach: { code: 'validation_required', message: 'Cannot be blank.' },
			})
		}

		const isNoVideo = !creative.video.value
		if (isNoVideo) {
			creative.setErrors({
				video: { code: 'validation_required', message: 'Cannot be blank.' },
			})
		}

		if (isNoApproach || isNoVideo) {
			return
		}
	}

	loading.value = true
	creative.clearErrors()

	await Http.patch<ICreative>(`/collections/creatives/records/${creativeBase.id.value}`, {
		...creativeBase.get(),
		status: 'moderation',
		changes: getChanges(),
	})
		.then(async (response) => {
			await router.push(`/creative/${response.id}`)
		})
		.catch((error: unknown) => {
			if (isHttpError(error)) {
				creative.setErrors(error.data)
			}

			toast.set('Ошибка при обновлении креатива')

			loading.value = false
		})
}

const modalShowing = ref(false)
</script>

<style scoped>
.edit-creative {
	max-width: 585px;

	.edit-creative__title {
		margin: 0 auto 20px;
	}

	.edit-creative__submit {
		margin: 0 auto;
	}
}
</style>