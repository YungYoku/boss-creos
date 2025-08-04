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

		<CardLong
			v-for="transaction in transactions"
			:key="transaction.id"
			class="balance__transaction"
		>
			<template #icon>
				<img
					src="./icons/tether.svg"
					alt=""
				>
			</template>

			<div class="balance__transaction-content">
				<div class="balance__transaction-value">
					{{ transaction.type === 'deposit' ? 'Пополнение' : 'Списание' }} ${{ transaction.amount }}
				</div>
				<div class="balance__transaction-date">
					{{ $date(transaction.created) }}
				</div>
			</div>
		</CardLong>

		<CardLong
			v-if="transactions?.length === 0"
			class="balance__transaction"
		>
			Нет данных
		</CardLong>
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
import { CardLong, Modal } from '@/components/structures'
import { Input } from '@/components/blocks'
import { Http } from '@/plugins'
import { IUser, Transaction, TransactionType } from '@/interfaces/User.ts'
import Button from '@/components/blocks/button/button.vue'
import Grid from '@/components/structures/grid/grid.vue'

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

	&__transaction-value {
		font-weight: 500;
		font-size: 14px;
	}

	&__transaction-date {
		font-weight: 500;
		font-size: 11px;
		color: #AFAFB7;
	}
}
</style>