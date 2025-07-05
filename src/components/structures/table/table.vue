<template>
	<div class="table table_default">
		<div class="table__inner">
			<div class="table__body">
				<Header :data="header"/>

				<Row :data="body">
					<template #cell="{ cell }">
						<component
							:is="cells[cell.key]"
							v-if="cells[cell.key]"
							name="cell"
							:cell="cell"
						/>
					</template>
				</Row>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { IHeader, IRows } from '@/interfaces/Table.ts'
import Header from './components/header.vue'
import Row from './components/row.vue'

defineProps({
	header: {
		type: Array as PropType<IHeader>,
		default: () => ([])
	},
	body: {
		type: Array as PropType<IRows>,
		default: () => ([])
	},
	cells: {
		type: Object as PropType<{ [key: string]: unknown }>,
		default: () => ({})
	}
})
</script>

<style lang="scss" src="./style.scss"></style>