<template>
	<div class="table__row">
		<div
			v-for="(col, index) in data"
			:key="col.name"
			:style="columnsWidth[index]"
			:data-col-index="index"
			:class="[
				`table__col_${col.key}`,
				getAlign(col, index),
				{
					'table__content_center': col.options.center,
					'_pointer': col.options.sortable !== false,
					'_resizable': isResizable(index)
				}
			]"
			class="table__col _fixed _header"
			@click.prevent.stop="changeSort(col)"
		>
			<div
				class="table__content fixed"
				:style="{
					position: data[index].width > 0 ? 'absolute' : 'initial'
				}"
			>
				<Icon
					:class="{ desc: options.desc }"
					class="table__arrow"
					color="--color-m300"
					name="arrow-up"
					size="s"
				/>

				{{ $t(`table.header.${col.name}`) }}
			</div>

			<div
				v-if="isResizable(index)"
				class="table__drag-trigger"
				:class="{
					'_active': isDragging && leftIndex === index
				}"
				@click.prevent.stop
				@mousedown="startDrag($event, index)"
				@dblclick="() => { resizeByContentLength(col.key, index); updateLS() }"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { Icon } from '@/components/elements'

const props = defineProps({
	data: {
		type: Array,
		default: () => ([])
	},
	options: {
		type: Object,
		default: () => ({})
	}
})

const options = reactive(props.options)
</script>
