<template>
	Пополнение баланса
	<div class="balance">
		Ваш баланс: ${{ auth.user.balance }}
		<Button
			class="shopping-cart__pay"
			@click="pay"
		>
			Пополнить
		</Button>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'
import { Button } from '@/components/blocks'
import { Http } from '@/plugins'
import { IUser } from '@/interfaces/User.ts'

const auth = useAuthStore()

const pay = async () => {
	await Http.patch<IUser>(`/collections/users/records/${auth.user.id}`, {
		...auth.user,
		balance: auth.user.balance + 50
	}).then(data => {
		auth.setUser(data)
	})
}
</script>

<style scoped lang="scss">
.balance {
	display: flex;
	flex-direction: column;
	gap: 20px;

	width: 800px;
	max-width: 100%;
	padding: 24px 15px;

	background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.08) 100%),
	radial-gradient(50% 100% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	border: 1px solid;
	border-radius: 10px;
	border-image-source: linear-gradient(135.28deg, rgba(255, 255, 255, 0.3) -128.53%, rgba(255, 255, 255, 0) 75.12%);
}
</style>