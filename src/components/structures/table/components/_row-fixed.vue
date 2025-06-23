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
					v-for="(col, c) in row.list"
					:key="`${r}-${col.key}`"
					v-context-menu="col.context ? {...col.context, form:col} : null"
					class="table__col _fixed _content"
					:class="[
						`deep_${deepLevel}`,
						`table__col_${col.key}`,
						`_size_${size}`,
						(col.options.align ? `_align_${col.options.align}` : ''),
						{
							_expand: options.expand && c === 0,
							_archived: col.data?.isArchived
						}
					]"
				>
					<div
						v-if="options.expand && c === 0"
						:class="{
							open: row.expand && row.open
						}"
						class="table__expand-arrow"
						@click="toExpand(col)"
					>
						<Icon
							v-skeleton="options.loading"
							name="chevron-down"
							size="m"
							color="--color-m300"
						/>
					</div>
					<span
						v-if="options.loading"
						v-skeleton="true"
					/>
					<slot
						v-else
						name="cell"
						:cell="{...col, r}"
					>
						<div class="table__content">
							<router-link
								v-if="col.options.link"
								:to="col.options.link"
							>
								<div
									v-if="col.data?.isArchived && col.key === 'name'"
									class="table__archived-icon"
								>
									<Icon
										v-skeleton="options.loading"
										name="archived"
										size="s"
									/>
								</div>
								<span v-html="col.text"/>
							</router-link>
							<span
								v-else
								:title="col.key === 'name' ? col.value : col.text"
								v-html="col.text"
							/>
						</div>
					</slot>
				</div>
			</slot>
		</div>
	</template>
</template>

<script setup lang="ts">
import { Icon } from '@/components/elements'

defineProps({
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
</script>
