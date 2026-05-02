<template>
	<div class="registration">
		<CardAuth
			width="400px"
			title="Регистрация"
			@keyup.enter="register"
		>
			<Input
				v-model="form.username.value"
				:error="form.username.error"
				label="Имя"
				type="text"
			/>

			<Input
				v-model="form.telegram.value"
				:error="form.telegram.error"
				label="Telegram"
				type="text"
			/>

			<Input
				v-model="form.email.value"
				:error="form.email.error"
				label="Почта"
				type="text"
			/>

			<Input
				v-model="form.password.value"
				:error="form.password.error"
				label="Пароль"
				type="password"
				autocomplete="new-password"
			/>

			<Input
				v-model="form.passwordConfirm.value"
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
					<span class="registration__btn-text-head"> Зарегистрироваться </span>

					Как баер
				</Button>
				<Button
					:disabled="loading"
					type="submit"
					variant="outline"
					class="registration__btn"
					@click="register('designer')"
				>
					<span class="registration__btn-text-head"> Зарегистрироваться </span>

					Как дизайнер
				</Button>
			</Grid>

			<template #footer>
				<div class="registration__have-account">
					<Text size="xs"> Есть аккаунт? </Text>
					<router-link
						to="/login"
						class="registration__link"
					>
						<Text size="xs"> Войти </Text>
					</router-link>
				</div>
			</template>
		</CardAuth>

		<AuthSlots />
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/stores/toast'

import { CardAuth } from '@/components/structures'
import { AuthSlots } from '@/components/sections'
import { Button, Input } from '@/components/blocks'
import { Text } from '@/components/elements'
import { Form, Http } from '@/plugins'
import type { IUser } from '@/types/user'
import Grid from '@/components/structures/grid/grid.vue'
import { isHttpError } from '@/plugins/http'
import { NO_AUTH } from '@/data/permissions'

definePage({
	meta: {
		permissions: [NO_AUTH],
		bgClass: 'auth',
		layout: 'auth'
	}
})

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

		await Http.post<IUser>('/collections/users/records', form.get())
			.then(async () => {
				await router.push('/login')
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

const isRegistrationPossible = computed(() => {
	const password = form.password.value
	const passwordConfirm = form.passwordConfirm.value
	const username = form.username.value

	return password.length > 0 && passwordConfirm.length > 0 && username.length > 0
})
</script>

<style scoped>
.registration {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 5%;
}

.registration__have-account {
	text-align: center;
}

.registration__link {
	text-decoration: underline;
}

.registration__btn {
	display: flex;
	flex-direction: column;
}

.registration__btn-text-head {
	font-size: 10px;
	color: #9e9e9e;
}
</style>