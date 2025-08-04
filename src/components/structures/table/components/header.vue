<template>
	<div class="table__row">
		<div
			v-for="item in data"
			:key="item.name"
			class="table__col _header"
		>
			<div class="table__content">
				{{ $t(item.name) }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { IHeader } from '@/types/Table.ts'

defineProps({
	data: {
		type: Array as PropType<IHeader>,
		default: () => ([])
	}
})
</script>
