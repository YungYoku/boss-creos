<template>
	{{ cell.newValue }}
</template>

<script setup lang="ts">
import { type ICell } from '@/types/table'

interface Props {
	cell: ICell
}

const { cell } = defineProps<Props>()
</script>