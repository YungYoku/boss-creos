<template>
	<div
		v-for="(row, rowIndex) in data"
		:key="rowIndex"
		class="table__row"
	>
		<div
			v-for="cell in row"
			:key="`${rowIndex}-${cell.key}`"
			class="table__col _content"
		>
			<slot
				name="cell"
				:cell="cell"
			>
				<div class="table__content">
					<template v-if="cell.newValue != null">
						<component
							:is="cell.options?.link?.new ? 'a' : 'div'"
							:href="cell.options?.link?.new"
							target="_blank"
							class="table__cell-value _new"
						>
							{{ cell.newValue }}
						</component>

						<component
							:is="cell.options?.link?.current ? 'a' : 'div'"
							:href="cell.options?.link?.current"
							target="_blank"
							class="table__cell-value _old"
						>
							{{ cell.currentValue }}
						</component>
					</template>

					<component
						:is="cell.options?.link?.current ? 'a' : 'div'"
						v-else
						:href="cell.options?.link?.current"
						target="_blank"
						class="table__cell-value _current"
					>
						{{ cell.currentValue }}
					</component>
				</div>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { IRows } from '@/types/table.ts'

defineProps({
	data: {
		type: Array as PropType<IRows>,
		default: () => ([])
	}
})
</script>
