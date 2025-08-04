<template>
	<div class="cell cell__actions">
		<Button
			variant="positive"
			@click="onClick(cell)"
		>
			Принять
		</Button>

		<Button variant="destructive">
			Отклонить
		</Button>
	</div>
</template>

<script setup lang="ts">
import { emptyCell, ICell } from '@/types/Table.ts'
import { Button } from '@/components/blocks'

type Props = {
	cell: ICell
}

withDefaults(defineProps<Props>(), {
	cell: () => ({ ...emptyCell }),
})

const emit = defineEmits(['action'])
const reload = () => emit('action', 'reload')

const onClick = async (cell: ICell) => {
	if (cell.options?.handler) {
		await cell.options.handler()
		reload()
	}
}
</script>

<style scoped lang="scss">
.cell {
	&.cell__actions {
		display: flex;
		gap: 5px;
	}
}
</style>