<template>
	<Grid
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
					class="new-creative__submit"
					variant="outline"
					@click="create"
				>
					Отправить на модерацию
				</Button>
			</Grid>
		</Island>
	</Grid>

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
				<InputRich
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
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'
import { useToast } from '@/stores/toast.ts'

import { Grid, Island, Modal } from '@/components/structures'
import {
	Button,
	InputImageRich,
	InputRich,
	InputVideoRich,
	SelectLiveRich,
	SelectRich,
	SwitcherRich,
	TextareaRich
} from '@/components/blocks'
import { Form, Http } from '@/plugins'
import { Text } from '@/components/elements'
import { creativeTypeItems, emptyCreative, type ICreative, ratioItems } from '@/types/creative.ts'

const auth = useAuthStore()

const creative = Form<ICreative>({ ...emptyCreative })

const router = useRouter()
const toast = useToast()

watch(() => auth.user.id, () => creative.creator.value = auth.user.id, { immediate: true })

const loading = ref(false)
const create = async () => {
	if (creative.type.value !== 'static') {
		const isNoApproach = !creative.approach.value
		if (isNoApproach) {
			creative.setErrors({
				approach: { code: 'validation_required', message: 'Cannot be blank.' }
			})
		}

		const isNoVideo = !creative.video.value
		if (isNoVideo) {
			creative.setErrors({
				video: { code: 'validation_required', message: 'Cannot be blank.' }
			})
		}

		if (isNoApproach || isNoVideo) {
			return
		}
	}

	loading.value = true
	creative.clearErrors()

	creative.creator.value = auth.user.id

	await Http
		.post<ICreative>('/collections/creatives/records', creative.get())
		.then(async response => {
			await router.push(`/creative/${response.id}`)
		})
		.catch(({ data }) => {
			creative.setErrors(data)

			toast.set('Ошибка при создании креатива')

			loading.value = false
		})
}

const modalShowing = ref(false)
</script>

<style scoped lang="scss">
.new-creative {
	max-width: 630px;

	&__title {
		margin: 0 auto 20px auto;
	}

	&__submit {
		margin: 0 auto;
	}
}
</style>