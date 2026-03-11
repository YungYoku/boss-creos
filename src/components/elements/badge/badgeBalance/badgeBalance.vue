<template>
	<Badge> Ваш баланс: ${{ auth.user.balance }} </Badge>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Badge } from '@/components/elements'

const auth = useAuthStore()
</script>