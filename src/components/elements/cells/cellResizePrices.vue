<template>
	{{ cell.newValue }}
</template>

<script setup lang="ts">
import { emptyCell, ICell } from '@/types/table.ts'

type Props = {
	cell: ICell
}

withDefaults(defineProps<Props>(), {
	cell: () => ({ ...emptyCell }),
})
</script>
