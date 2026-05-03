<template>
	<div
		class="grid"
		:class="[
			`_gap-${gap}`,
			{
				_vertical: vertical
			}
		]"
		:style="style"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, type Ref, watch } from 'vue'

import { Screen } from '@/plugins'

defineEmits(['keyup', 'click'])

type Align = 'start' | 'center' | 'end' | 'stretch' | 'initial'
type Columns = number | (number | string)[] | null

interface Props {
	vertical?: boolean
	gap?: 'xs' | 's' | 'm' | 'l' | 'xl'
	verAlign?: Align
	horAlign?: Align
	columns?: Columns
	columnsXl?: Columns
	columnsL?: Columns
	columnsM?: Columns
	columnsS?: Columns
}

const {
	vertical = false,
	gap = 's',
	verAlign = 'initial',
	horAlign = 'initial',
	columns = null,
	columnsXl = null,
	columnsL = null,
	columnsM = null,
	columnsS = null
} = defineProps<Props>()

const activeColumns: Ref<(number | string)[] | number | null> = ref(1)
const updateActiveColumns = () => {
	if (columns) {
		activeColumns.value = columns
		return
	}

	if (Screen.isSize('s')) {
		activeColumns.value = columnsS ?? columnsM ?? columnsL ?? columnsXl
	} else if (Screen.isSize('m')) {
		activeColumns.value = columnsM ?? columnsL ?? columnsXl
	} else if (Screen.isSize('l')) {
		activeColumns.value = columnsL ?? columnsXl
	} else if (Screen.isSize('xl') || Screen.isLarger('xl')) {
		activeColumns.value = columnsXl
	}
}
onMounted(() => {
	updateActiveColumns()
	window.addEventListener('resize', updateActiveColumns)
})
onBeforeUnmount(() => {
	window.removeEventListener('resize', updateActiveColumns)
})
watch(() => [columns, columnsXl, columnsL, columnsM, columnsS], updateActiveColumns)

const getAlign = (align: Align) => {
	switch (align) {
		case 'start':
			return 'flex-start'
		case 'center':
			return 'center'
		case 'end':
			return 'flex-end'
		case 'initial':
			return 'initial'
		case 'stretch':
			return 'stretch'
		default:
			return 'initial'
	}
}
const style = computed(() => {
	if (activeColumns.value === null) return {}

	if (vertical) {
		return {
			'align-items': getAlign(horAlign)
		}
	}

	if (typeof activeColumns.value === 'number') {
		return {
			gridTemplateColumns: `repeat(${activeColumns.value.toString()}, 1fr)`,
			'align-items': getAlign(verAlign),
			'justify-items': getAlign(horAlign)
		}
	}

	const _columns = [...activeColumns.value]
	return {
		gridTemplateColumns: _columns
			.reduce((result: string, column: string | number) => {
				if (typeof column === 'string') return `${result} ${column} `
				if (typeof column === 'number') return `${result} ${column.toString()}fr `
				return result
			}, '')
			.trim(),
		'align-items': getAlign(verAlign),
		'justify-items': getAlign(horAlign)
	}
})
</script>
]

<style scoped>
.grid {
	width: 100%;
	display: grid;

	&._vertical {
		display: flex;
		flex-direction: column;
	}

	&._gap-xs {
		gap: 4px;
	}

	&._gap-s {
		gap: 8px;
	}

	&._gap-m {
		gap: 12px;
	}

	&._gap-l {
		gap: 16px;
	}

	&._gap-xl {
		gap: 20px;
	}
}
</style>