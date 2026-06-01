<template>
	<div class="table__row">
		<div
			v-for="item in data"
			:key="item.name"
			class="table__col _header"
		>
			<div class="table__content">
				{{ $t(item.name) }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { IHeader } from '@/types/table'

interface Props {
	data?: IHeader
}

const { data = [] } = defineProps<Props>()
</script>