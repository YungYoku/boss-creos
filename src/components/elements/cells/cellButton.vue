<template>
	<Button @click="cell.options?.handler?.()">
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
</script>

<style scoped lang="scss">

</style>