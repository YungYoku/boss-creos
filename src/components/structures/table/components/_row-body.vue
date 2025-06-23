<template>
	<template
		v-for="(row, r) in data"
		:key="`${row.key}-${r}`"
	>
		<div
			class="table__row"
			@mouseenter="hover"
		>
			<slot name="row">
				<div
					v-for="(col) in row.list"
					:key="`${r}-${col.key}`"
					v-context-menu="col.context ? {...col.context, form:col} : null"
					class="table__col _content"
					:class="[
						`deep_${deepLevel}`,
						`table__col_${col.key}`,
						`_size_${size}`,
						getAlign(col),
						{
							_archived: col.data?.isArchived
						}
					]"
				>
					<span
						v-if="options.loading || showLoading(col.value)"
						v-skeleton="true"
					/>
					<slot
						v-else
						name="cell"
						:cell="{...col, r}"
					>
						<div
							class="table__content"
							:title="col.key === 'name' ? col.value : col.text"
							v-html="col.text"
						/>
					</slot>
				</div>
			</slot>
			<slot
				name="overlay"
				:index="r"
			/>
		</div>
	</template>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps({
	data: {
		type: Array,
		default: () => ([])
	},
	options: {
		type: Object,
		default: () => ({})
	},
	size: {
		type: String,
		default: 'm'
	}
})

const options = reactive(props.options)

const showLoading = (type) => {
	const arrValue = [undefined, '']
	return arrValue.includes(type)
}
</script>
