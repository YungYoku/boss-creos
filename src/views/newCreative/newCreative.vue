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

				<Grid>
					<Switcher
						v-model="creative.resize.value"
						:disabled="loading"
						:error="creative.resize.error"
						label="Ресайз"
					/>

					<template v-if="creative.resize.value">
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
					</template>
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
import { useAuthStore } from '@/stores/auth.ts'
import { useToast } from '@/stores/toast.ts'

import { Grid, Island } from '@/components/structures'
import { Button, Input, InputVideo, InputImage, Select, SelectLive, Switcher, Textarea } from '@/components/blocks'
import { Form, Http } from '@/plugins'
import { Text } from '@/components/elements'
import { creativeTypeItems, emptyCreative, ICreative, ratioItems } from '@/interfaces/Creative.ts'

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

			toast.set('Ошибка при создании креатива')

			loading.value = false
		})
}
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