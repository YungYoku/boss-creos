<template>
	<div class="table__row">
		<div
			v-for="(item, index) in data"
			:key="item.key"
			:style="columnsWidth[index]"
			:data-col-index="index"
			:class="[
				`table__col_${item.key}`,
				getAlign(item, index),
				{
					'table__col_sort': options.sort === item.key,
					'table__content_center': item.options.center,
					'_pointer': item.options.sortable !== false,
					'_resizable': isResizable(index)
				}
			]"
			class="table__col _header"
			@click.prevent.stop="changeSort(item)"
		>
			<div
				class="table__content"
				:style="{
					position: data[index].width > 0 ? 'absolute' : 'initial'
				}"
			>
				<Icon
					v-if="options.sort === item.key"
					:class="{ desc: options.desc }"
					class="table__arrow"
					color="--color-m300"
					name="arrow-up"
					size="s"
				/>

				{{ $t(`table.header.${item.name}`) }}
			</div>

			<div
				v-if="isResizable(index)"
				class="table__drag-trigger"
				:class="{
					'_active': isDragging && leftIndex === index
				}"
				@click.prevent.stop
				@mousedown="startDrag($event, index)"
				@dblclick="() => { resizeByContentLength(item.key, index); updateLS() }"
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
	},
})

const options = reactive(props.options)
</script>
