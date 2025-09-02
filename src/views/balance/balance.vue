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
			<BadgeBalance/>

			<div class="balance__actions">
				<Badge @click="showWithdrawModal">
					Вывод средств
				</Badge>
				<Badge @click="showDepositModal">
					Пополнить баланс
				</Badge>
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

					<div
						class="balance__transaction-status"
						:class="{
							_pending: transaction.status === 'pending',
							_done: transaction.status === 'done'
						}"
					/>
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
			<template v-if="type === 'deposit'">
				<InputRich
					v-model="amount"
					label="Сумма"
					type="number"
				/>
				<Button
					variant="outline"
					@click="action"
				>
					Пополнить
				</Button>
			</template>

			<template v-else>
				<InputRich
					v-model="address"
					label="Адрес"
				/>
				<InputRich
					v-model="blockchain"
					label="Сеть"
				/>
				<InputRich
					v-model="amount"
					label="Сумма"
					type="number"
				/>
				<Button
					variant="outline"
					@click="action"
				>
					Вывод
				</Button>
			</template>
		</Grid>
	</Modal>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { CardLong, Grid, Modal } from '@/components/structures'
import { Button, InputRich } from '@/components/blocks'
import { Badge, BadgeBalance } from '@/components/elements'
import { Http } from '@/plugins'
import { IUser } from '@/types/user.ts'
import { Transaction, TransactionStatus, TransactionType } from '@/types/transaction.ts'

const auth = useAuthStore()
const transactions = computed(() => auth.user.expand?.transactions)

const address = ref('')
const blockchain = ref('')
const amount = ref(0)
const type: Ref<TransactionType> = ref('deposit')

const makeTransaction = async (status: TransactionStatus) => {
	return await Http.post<Transaction>('/collections/transactions/records', {
		amount: amount.value,
		type: type.value,
		status
	}).then((res) => {
		return res.id
	})
}

const updateUser = async (balance: number, transactionStatus: TransactionStatus) => {
	const newTransactionId = await makeTransaction(transactionStatus)

	await Http.patch<IUser>(`/collections/users/records/${auth.user.id}`, {
		...auth.user,
		transactions: [...auth.user.transactions, newTransactionId],
		balance
	}, {
		expand: ['baskets', 'baskets.creative', 'baskets.creative.preview', 'baskets.creative.slot', 'baskets.geo', 'transactions']
	}).then(data => {
		auth.setUser(data)
		amount.value = 0
	})
}

const action = async () => {
	if (typeof amount.value === 'number' && amount.value > 0) {
		if (type.value === 'deposit') {
			await updateUser(auth.user.balance + amount.value, 'done')
		} else if (type.value === 'withdraw') {
			await updateUser(auth.user.balance - amount.value, 'pending')
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
		display: flex;
		align-items: center;
		gap: 10px;

		font-weight: 500;
		font-size: 14px;
	}

	&__transaction-date {
		font-weight: 500;
		font-size: 11px;
		color: #AFAFB7;
	}

	&__transaction-status {
		width: 5px;
		height: 5px;
		border-radius: 50%;

		&._pending {
			background: #fdfd1a;
		}

		&._done {
			background: #18e618;
		}
	}
}
</style>