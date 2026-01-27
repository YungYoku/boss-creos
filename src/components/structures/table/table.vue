<template>
	<div class="table table_default">
		<div
			v-if="body.length > 0"
			class="table__inner"
		>
			<div class="table__body">
				<Header :data="header"/>

				<Row :data="body">
					<template #cell="{ cell }">
						<component
							:is="cells[cell.key]"
							v-if="cells[cell.key]"
							name="cell"
							:cell="cell"
							@action="handleAction"
						/>
					</template>
				</Row>
			</div>
		</div>

		<div
			v-else
			class="table__empty"
		>
			Пусто
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { IHeader, IRows } from '@/types/table'
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
		type: Object as PropType<Record<string, unknown>>,
		default: () => ({})
	}
})

const emit = defineEmits(['reload'])
const reload = () => {
	emit('reload')
}

const actions = {
	'reload': reload
}
const handleAction = (key: keyof typeof actions) => {
	actions[key]()
}
</script>

<style lang="scss" src="./style.scss"></style>