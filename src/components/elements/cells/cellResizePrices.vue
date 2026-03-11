<template>
	{{ cell.newValue }}
</template>

<script setup lang="ts">
import { type ICell } from '@/types/table'

interface Props {
	cell: ICell
}

withDefaults(defineProps<Props>(), {})
</script>