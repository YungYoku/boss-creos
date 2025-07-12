<template>
	{{ cell.newValue }}
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
