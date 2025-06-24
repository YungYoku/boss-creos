<template>
	<div class="table table_default">
		<div class="table__inner">
			<div class="table__body">
				<Header :data="header"/>

				<Row :data="data">
					<template #cell="{ cell }">
						<slot
							name="cell"
							:cell="cell"
						/>
					</template>
					<template #overlay="{ index }">
						<slot
							name="overlay"
							:index="index"
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
	data: {
		type: Array as PropType<IRows>,
		default: () => ([])
	}
})
</script>

<style lang="scss" src="./style.scss"></style>