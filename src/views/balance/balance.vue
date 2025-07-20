<template>
	Баланс
	<div class="balance-top-up">
		Ваш баланс: ${{ auth.user.balance }}

		<Input
			v-model="topUpValue"
			label="Введите сумму"
			type="number"
		/>
		<Button
			class="shopping-cart__pay"
			@click="topUp"
		>
			Пополнить
		</Button>
	</div>
	<div class="balance-pay-out">
		Ваш баланс: ${{ auth.user.balance }}

		<Input
			v-model="payOutValue"
			label="Введите сумму"
			type="number"
		/>
		<Button
			class="shopping-cart__pay"
			@click="payOut"
		>
			Вывести
		</Button>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { Button } from '@/components/blocks'
import { Http } from '@/plugins'
import { IUser } from '@/interfaces/User.ts'
import { Input } from '@/components/blocks'

const auth = useAuthStore()

const topUpValue = ref(0)
const topUp = async () => {
	if (typeof topUpValue.value !== 'number' || topUpValue.value === 0) return

	await Http.patch<IUser>(`/collections/users/records/${auth.user.id}`, {
		...auth.user,
		balance: auth.user.balance + topUpValue.value
	}).then(data => {
		auth.setUser(data)
		topUpValue.value = 0
	})
}

const payOutValue = ref(0)
const payOut = async () => {
	if (typeof payOutValue.value !== 'number' || payOutValue.value === 0) return

	if (payOutValue.value > auth.user.balance) return

	await Http.patch<IUser>(`/collections/users/records/${auth.user.id}`, {
		...auth.user,
		balance: auth.user.balance - payOutValue.value
	}).then(data => {
		auth.setUser(data)
		payOutValue.value = 0
	})
}
</script>

<style scoped lang="scss">
.balance-top-up,
.balance-pay-out {
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