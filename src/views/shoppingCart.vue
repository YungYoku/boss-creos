<template>
	<div
		v-for="basket in user.user.expand?.baskets"
		:key="basket.id"
	>
		{{ basket.expand?.creative?.id }}
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'

const user = useAuthStore()
</script>

<style scoped lang="scss">

</style>