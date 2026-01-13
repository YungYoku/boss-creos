<template>
	{{ cell.newValue }}
</template>

<script setup lang="ts">
import { type ICell } from '@/types/table'

type Props = {
	cell: ICell
}

withDefaults(defineProps<Props>(), {})
</script>
