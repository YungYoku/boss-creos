<template>
	<div class="balance">
		<div class="balance__title">
			Пополнение баланса
		</div>

		<div class="balance__description">
			Баланс кошелька — это сумма на вашем личном счете внутри нашего сайта.
			Эти средства можно использовать для покупки креативов, не совершая каждый раз транзакцию.
		</div>

		<div class="balance__action-panel">
			<div class="balance__value">
				Ваш баланс: ${{ auth.user.balance }}
			</div>

			<div class="balance__actions">
				<div
					class="balance__withdraw"
					@click="showWithdrawModal"
				>
					Вывод денег
				</div>
				<div
					class="balance__deposit"
					@click="showDepositModal"
				>
					Пополнить баланс
				</div>
			</div>
		</div>

		<div class="balance__history">
			<div
				v-for="transaction in transactions"
				:key="transaction.id"
				class="balance__transaction"
			>
				${{ transaction.amount }}, type: {{ transaction.type }}
			</div>
		</div>
	</div>

	<Modal
		v-if="modalShowing"
		:width="585"
		@close="modalShowing = false"
	>
		<Grid vertical>
			<Input
				v-model="value"
				label="Введите сумму"
				type="number"
			/>
			<Button
				variant="outline"
				@click="action"
			>
				{{ type === 'deposit' ? 'Пополнить' : 'Вывести' }}
			</Button>
		</Grid>
	</Modal>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { Modal } from '@/components/structures'
import { Input } from '@/components/blocks'
import { Http } from '@/plugins'
import { IUser, Transaction, TransactionType } from '@/interfaces/User.ts'
import Button from '@/components/blocks/button/button.vue'
import Grid from '@/components/structures/grid.vue'

const auth = useAuthStore()
const transactions = computed(() => auth.user.expand?.transactions)

const value = ref(0)
const type: Ref<TransactionType> = ref('deposit')

const makeTransaction = async (amount: number, type: TransactionType) => {
	return await Http.post<Transaction>('/collections/transactions/records', {
		amount,
		type,
	}).then((res) => {
		return res.id
	})
}

const updateUser = async (balance: number) => {
	const newTransactionId = await makeTransaction(value.value, type.value)

	await Http.patch<IUser>(`/collections/users/records/${auth.user.id}`, {
		...auth.user,
		transactions: [...auth.user.transactions, newTransactionId],
		balance
	}, {
		expand: ['baskets', 'baskets.creative', 'baskets.creative.preview', 'baskets.creative.slot', 'baskets.geo', 'transactions']
	}).then(data => {
		auth.setUser(data)
		value.value = 0
	})
}

const action = async () => {
	if (typeof value.value === 'number' && value.value > 0) {
		if (type.value === 'deposit') {
			await updateUser(auth.user.balance + value.value)
		} else if (type.value === 'withdraw') {
			await updateUser(auth.user.balance - value.value)
		}
	}

	modalShowing.value = false
}

const modalShowing = ref(false)
const showDepositModal = () => {
	type.value = 'deposit'
	modalShowing.value = true
}
const showWithdrawModal = () => {
	type.value = 'withdraw'
	modalShowing.value = true
}
</script>

<style scoped lang="scss">
.balance {
	width: 860px;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;

	&__title {
		font-weight: 700;
		font-size: 32px;
	}

	&__description {
		max-width: 600px;
		font-weight: 500;
		font-size: 12px;
		text-align: center;
	}

	&__action-panel {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	&__value,
	&__withdraw,
	&__deposit {
		font-weight: 700;
		font-size: 12px;
		border-radius: 16px;
		border: 1px solid #1D1D20;
		padding: 4px 10px;
		background: #0F0F10;
	}

	&__actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	&__withdraw,
	&__deposit {
		cursor: pointer;
	}

	&__history {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;

		padding: 24px 15px;

		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.08) 100%),
		radial-gradient(50% 100% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
		border: 1px solid;
		border-radius: 10px;
		border-image-source: linear-gradient(135.28deg, rgba(255, 255, 255, 0.3) -128.53%, rgba(255, 255, 255, 0) 75.12%);
	}
}
</style>