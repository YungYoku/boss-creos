<template>
	<AuthLayout class="login">
		<div class="login__content">
			<CardAuth
				width="400px"
				title="Вход"
				@keyup.enter="login"
			>
				<Input
					v-model.trim="form.identity.value"
					:error="form.identity.error"
					label="Логин или почта"
					type="text"
				/>

				<Input
					v-model.trim="form.password.value"
					:error="form.password.error"
					label="Пароль"
					type="password"
				/>

				<Button
					:disabled="loading"
					type="submit"
					variant="outline"
					@click="login"
				>
					Войти
				</Button>

				<template #footer>
					<Text
						size="xs"
						class="login__no-account"
					>
						Нет аккаунта?
						<router-link
							to="/registration"
							class="login__link"
						>
							Зарегистрироваться
						</router-link>
					</Text>

					<router-link
						class="login__link"
						to="/login"
					>
						<Text size="xs">
							Забыли пароль?
						</Text>
					</router-link>
				</template>
			</CardAuth>

			<AuthSlots/>
		</div>
	</AuthLayout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import { AuthLayout } from '@/components/layouts'
import { CardAuth } from '@/components/structures'
import { AuthSlots } from '@/components/sections'
import { Button, Input } from '@/components/blocks'
import { Text } from '@/components/elements'
import { Form, Http } from '@/plugins'
import type { IUserLogin } from '@/types/user'
import { isHttpError } from '@/plugins/http.ts'

type LoginForm = {
	identity: string
	password: string
}

const form = Form<LoginForm>({
	identity: '',
	password: ''
})

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const loading = ref(false)
const login = async () => {
	if (isLoginPossible.value) {
		loading.value = true
		form.clearErrors()

		await Http
			.post<IUserLogin>('/collections/users/auth-with-password', form.get())
			.then(async res => {
				auth.setToken(res.token)
				auth.setUser(res.record)
				await router.push('/')
			})
			.catch((error: unknown) => {
				if (isHttpError(error)) {
					form.setErrors(error.data)
				}

				toast.set('Ошибка авторизации')

				loading.value = false
			})
	}
}

const isLoginPossible = computed(() => {
	const password = form.password.value
	const identity = form.identity.value

	return password.length >= 0 && identity.length > 0
})
</script>

<style scoped lang="scss">
.login {
	&__content {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 100%;
		gap: 5%;
	}

	&__no-account {
		text-align: center;
	}

	&__link {
		text-align: center;
		text-decoration: underline;
	}
}
</style>