<template>
	<Grid
		vertical
		gap="l"
		class="rating"
	>
		<Text
			size="m"
			:loading
		>
			Оставьте свой отзыв для {{ user }}!
		</Text>

		<RatingStarsEditable
			v-if="!loading"
			v-model="value.stars"
		/>

		<Textarea
			v-model="value.review"
			label="Отзыв"
			:disabled="loading"
		/>

		<Grid
			:columns-xl="2"
			:columns-s="1"
		>
			<Button
				:loading
				@click="back"
			>
				Назад
			</Button>

			<Button
				:loading
				@click="send"
			>
				Отправить
			</Button>
		</Grid>
	</Grid>
</template>

<script setup lang="ts">
import { ref, type Ref, watch } from 'vue'

import { Grid } from '@/components/structures'
import { Button, RatingStarsEditable, Textarea } from '@/components/blocks'
import { Text } from '@/components/elements'
import { emptyRating, type IRating } from '@/types/rating'

interface Props {
	modelValue?: IRating
	loading?: boolean
	user?: string
}

const props = defineProps<Props>()
const { loading = false, user = 'User' } = props

const emit = defineEmits(['update:modelValue', 'back'])

const value: Ref<IRating> = ref({ ...emptyRating })
watch(
	() => props.modelValue,
	() => {
		if (props.modelValue) value.value = props.modelValue
	},
	{ immediate: true }
)

const back = () => {
	emit('back')
}
const send = () => {
	emit('update:modelValue', value.value)
	back()
}
</script>