<template>
	<div
		v-for="(row, rowIndex) in data"
		:key="rowIndex"
		class="table__row"
	>
		<slot name="row">
			<div
				v-for="cell in row"
				:key="`${rowIndex}-${cell.key}`"
				class="table__col _content"
			>
				<slot
					name="cell"
					:cell="cell"
				>
					<div
						class="table__content"
						v-html="cell.value"
					/>
				</slot>
			</div>
		</slot>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { IRows } from '@/interfaces/Table.ts'

defineProps({
	data: {
		type: Array as PropType<IRows>,
		default: () => ([])
	}
})
</script>
