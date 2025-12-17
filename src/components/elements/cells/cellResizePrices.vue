<template>
	{{ cell.newValue }}
</template>

<script setup lang="ts">
import { emptyCell, type ICell } from '@/types/table'

type Props = {
	cell: ICell
}

withDefaults(defineProps<Props>(), {
	cell: () => ({ ...emptyCell }),
})
</script>
