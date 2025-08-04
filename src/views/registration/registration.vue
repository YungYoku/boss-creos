<template>
	<AuthLayout class="registration">
		<div class="registration__content">
			<CardAuth
				width="400px"
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

				<Grid :columns="2">
					<Button
						:disabled="loading"
						type="submit"
						variant="outline"
						class="registration__btn"
						@click="register('buyer')"
					>
						<span class="registration__btn-text-head">
							Зарегистрироваться
						</span>

						Как баер
					</Button>
					<Button
						:disabled="loading"
						type="submit"
						variant="outline"
						class="registration__btn"
						@click="register('designer')"
					>
						<span class="registration__btn-text-head">
							Зарегистрироваться
						</span>

						Как дизайнер
					</Button>
				</Grid>

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
			</CardAuth>

			<AuthSlots/>
		</div>
	</authlayout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/stores/toast.ts'

import { AuthLayout } from '@/components/layouts'
import { CardAuth } from '@/components/structures'
import { AuthSlots } from '@/components/sections'
import { Button, Input } from '@/components/blocks'
import { Text } from '@/components/elements'
import { Form, Http } from '@/plugins'
import { IUser } from '@/interfaces/User.ts'
import Grid from '@/components/structures/grid/grid.vue'

type Role = 'buyer' | 'designer'

interface RegistrationForm {
	username: string
	telegram: string
	email: string
	password: string
	passwordConfirm: string
	role: Role
	energy: number
	checked_at: Date
}

const form = Form<RegistrationForm>({
	username: '',
	telegram: '',
	email: '',
	password: '',
	passwordConfirm: '',
	role: 'buyer',
	energy: 100,
	checked_at: new Date()
})

const router = useRouter()
const toast = useToast()

const loading = ref(false)

const refCode = ref('')
refCode.value = router.currentRoute.value.query.ref as string

const register = async (role: Role) => {
	if (isRegistrationPossible.value) {
		form.role.value = role
		
		loading.value = true
		form.clearErrors()

		await Http
			.post<IUser>('/collections/users/records', form.get())
			.then(async () => {
				await router.push('/login')
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
		justify-content: center;
		align-items: center;

		width: 100%;
		gap: 5%;
	}

	&__have-account {
		text-align: center;
	}

	&__link {
		text-decoration: underline;
	}

	&__btn {
		display: flex;
		flex-direction: column;
	}

	&__btn-text-head {
		font-size: 10px;
		color: #9E9E9E;
	}
}
</style>