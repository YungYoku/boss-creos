<template>
	<Button @click="onClick(cell)">
		Принять
	</Button>
</template>

<script setup lang="ts">
import { emptyCell, ICell } from '@/interfaces/Table.ts'
import { Button } from '@/components/blocks'

type Props = {
	cell: ICell
}

withDefaults(defineProps<Props>(), {
	cell: () => ({ ...emptyCell }),
})

const emit = defineEmits(['reload'])
const reload = () => emit('reload')

const onClick = async (cell: ICell) => {
	if (cell.options?.handler) {
		await cell.options.handler()
		reload()
	}
}
</script>

<style scoped lang="scss">

</style>