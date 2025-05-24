<template>
	<AuthLayout class="registration">
		<div class="registration__content">
			<Card
				width="300px"
				title="Регистрация"
				@keyup.enter="register"
			>
				<Input
					v-model.trim="form.username.value"
					:error="form.username.error"
					label="Имя"
					type="text"
				/>

				<Input
					v-model.trim="form.telegram.value"
					:error="form.telegram.error"
					label="Telegram"
					type="text"
				/>

				<Input
					v-model.trim="form.email.value"
					:error="form.email.error"
					label="Почта"
					type="text"
				/>

				<Input
					v-model.trim="form.password.value"
					:error="form.password.error"
					label="Пароль"
					type="password"
					autocomplete="new-password"
				/>

				<Input
					v-model.trim="form.passwordConfirm.value"
					:error="form.passwordConfirm.error"
					label="Повторите пароль"
					type="password"
					autocomplete="new-password"
				/>

				<Select
					v-model="form.role.value"
					:error="form.role.error"
					:items="roleItems"
					label="Роль"
					:clearable="false"
				/>

				<Button
					:disabled="loading"
					type="submit"
					@click="register"
				>
					Зарегистрироваться
				</Button>

				<template #footer>
					<div class="registration__have-account">
						<Text size="xs">
							Есть аккаунт?
						</Text>
						<router-link
							to="/login"
							class="registration__link"
						>
							<Text size="xs">
								Войти
							</Text>
						</router-link>
					</div>
				</template>
			</Card>

			<AuthSlots/>
		</div>
	</authlayout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/stores/toast'

import { AuthLayout } from '@/components/layouts'
import { Card } from '@/components/structures'
import { AuthSlots } from '@/components/sections'
import { Select, Input, Button } from '@/components/blocks'
import { Text } from '@/components/elements'
import { Http, Form } from '@/plugins'
import { IUser } from '@/interfaces/User.ts'

interface RegistrationForm {
	username: string
	telegram: string
	email: string
	password: string
	passwordConfirm: string
	role: string
	energy: number
	checked_at: Date
}

const form = Form<RegistrationForm>({
	username: '',
	telegram: '',
	email: '',
	password: '',
	passwordConfirm: '',
	role: 'customer',
	energy: 100,
	checked_at: new Date()
})

const router = useRouter()
const toast = useToast()

const loading = ref(false)

const roleItems = [
	{ id: 'customer', name: 'Заказчик' },
	{ id: 'executor', name: 'Исполнитель' }
]

const refCode = ref('')
refCode.value = router.currentRoute.value.query.ref as string

const register = async () => {
	if (isRegistrationPossible.value) {
		loading.value = true
		form.clearErrors()

		await Http
			.post<IUser>('/collections/users/records', form.get())
			.then(() => {
				router.push('/login')
			})
			.catch(({ data }) => {
				form.setErrors(data)

				toast.set('Ошибка авторизации')

				loading.value = false
			})
	}
}

const isRegistrationPossible = computed(() => {
	const password = form.password.value
	const passwordConfirm = form.passwordConfirm.value
	const username = form.username.value

	return password.length > 0 && passwordConfirm.length > 0 && username.length > 0
})
</script>

<style scoped lang="scss">
.registration {
	&__content {
		display: flex;
		align-items: center;
		gap: 5%;
	}

	&__have-account {
		text-align: center;
	}

	&__link {
		text-decoration: underline;
	}
}
</style>