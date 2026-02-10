<template>
	<Popover class="date-picker">
		<template #trigger>
			<Label v-if="value">
				{{ label }}
			</Label>

			<Button
				class="date-picker__button"
				variant="outline"
			>
				{{ printedValue }}
			</Button>
		</template>

		<Calendar v-model="value"/>
	</Popover>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'

import { Popover } from '@/components/structures'
import { Button, Calendar } from '@/components/blocks'
import { Label } from '@/components/elements'

defineProps({
	label: {
		type: String,
		default: 'Дата'
	}
})

const months = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря'
] as const

const value = defineModel({
	type: Object as PropType<Date>,
	default: () => new Date()
})
const printedValue = computed(() => {
	const date = new Date(value.value)

	const day = date.getDate().toString()
	const month = months[date.getMonth()] ?? ''
	const year = date.getFullYear().toString()

	return `${day} ${month} ${year} г.`
})
</script>

<style scoped>
.date-picker {
	.date-picker__button {
		justify-content: flex-start;
		width: 100%;
		padding-top: 20px;
		padding-left: 12px;
	}
}
</style>