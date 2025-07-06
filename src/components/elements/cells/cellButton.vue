<template>
	<button @click="cell.options?.handler?.()">
		Кнопка
		{{ cell.options }}
	</button>
</template>

<script setup lang="ts">
import { emptyCell, ICell } from '@/interfaces/Table.ts'

type Props = {
	cell: ICell
}

withDefaults(defineProps<Props>(), {
	cell: () => ({ ...emptyCell }),
})
</script>

<style scoped lang="scss">

</style>