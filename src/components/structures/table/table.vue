<template>
	<div class="table table_default">
		<div v-if="body.length > 0" class="table__inner">
			<div class="table__body">
				<Header :data="header" />

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

		<div v-else class="table__empty">Пусто</div>
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
		default: () => [],
	},
	body: {
		type: Array as PropType<IRows>,
		default: () => [],
	},
	cells: {
		type: Object as PropType<Record<string, unknown>>,
		default: () => ({}),
	},
})

const emit = defineEmits(['reload'])
const reload = () => {
	emit('reload')
}

const actions = {
	reload: reload,
}
const handleAction = (key: keyof typeof actions) => {
	actions[key]()
}
</script>

<style scoped>
.table {
	position: relative;
	box-sizing: border-box;
	display: flex;
	width: 100%;
	overflow: auto;
	background: #fff;
	border-radius: 10px;

	.table__body {
		display: table;
		min-width: 100%;
	}

	.table__inner {
		flex-grow: 1;
		border-top-right-radius: 10px;

		.table__col {
			&:last-child {
				border-right: none;
			}
		}
	}

	.table__text,
	.table__link span {
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.table__row {
		position: relative;
		display: table-row;
	}

	.table__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 14px;

		a {
			display: flex;
			gap: 10px;
			align-items: center;
		}

		.table__cell-value {
			&._current {
				color: #545454;
			}

			&._new {
				color: green;
			}

			&._old {
				color: red;
			}
		}
	}

	.table__col {
		position: relative;
		box-sizing: border-box;
		display: table-cell;
		min-width: 40px;
		height: 50px;
		padding: 0;
		font-size: 14px;
		font-weight: 400;
		font-variant-numeric: tabular-nums;
		line-height: 14px;
		vertical-align: middle;
		color: #000;
		text-align: right;
		white-space: nowrap;
		border-right: 1px dashed #000;

		&._content {
			padding: 0 5px;
			overflow: hidden;

			.table__content,
			.table__value-wrap {
				height: 100%;
			}

			.table__value-wrap {
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}

		&._header {
			position: relative;
			padding: 18px 10px;
			font-size: 14px;
			font-weight: 500;
			color: #000;
			user-select: none;
			background: linear-gradient(180deg, #fcfdff 0%, #ededed 100%);

			.table__content {
				justify-content: flex-start;
			}
		}
	}

	.table__col_value-wrap {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.table__col_value:not(.table__col_header) {
		font-size: 14px;
		font-weight: 400;
		font-variant-numeric: lining-nums tabular-nums;
		line-height: 1.25;
		color: #000;
	}

	.table__col_color {
		background: #ed806f;
		color: #fff;
	}

	.table__empty {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		color: #000;
	}
}
</style>