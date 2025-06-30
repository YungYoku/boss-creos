<template>
	<Grid
		:columns="1"
		vertical
		class="profile"
	>
		<Avatar
			size="l"
			editable
			self
		/>

		<Input
			v-model="form.username.value"
			:error="form.username.error"
			:disabled="loading"
			label="Имя"
		/>

		<Input
			v-model="form.email.value"
			:error="form.email.error"
			:disabled="loading"
			label="Почта"
		/>

		<Textarea
			v-model="form.description.value"
			:error="form.description.error"
			:disabled="loading"
			label="О себе"
			height="240px"
		/>

		<Input
			v-if="isWithRefCode"
			v-model="auth.user.referral_code"
			disabled
			label="Реферальный код"
		/>

		<Button
			v-else
			:disabled="loading"
			@click="generateRefCode"
		>
			Создать реферальный код
		</Button>

		<Button
			:disabled="loading"
			@click="save"
		>
			Сохранить
		</Button>
	</Grid>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useToast } from '@/stores/toast.ts'

import { Form, Http } from '@/plugins'
import { Grid } from '@/components/structures'
import { Avatar, Button, Input, Textarea } from '@/components/blocks'
import { IReferralCode } from '@/interfaces/ReferralCode.ts'
import { emptyUser, IUser } from '@/interfaces/User.ts'

const auth = useAuthStore()
const toast = useToast()

const form = Form<IUser>({ ...emptyUser })

watch(() => auth.user, () => form.set(auth.user), { immediate: true })

const loading = ref(false)

const generateRefCode = async () => {
	loading.value = true

	let referral_code = ''
	await Http
		.post<IReferralCode>('/collections/referral_codes/records')
		.then((res) => {
			referral_code = res.id
		})

	await Http
		.patch<IUser>(`/collections/users/records/${auth.user.id}`, {
			referral_code
		})
		.then((res) => {
			auth.setUser(res)
		})

	loading.value = false
}

const save = async () => {
	loading.value = true
	form.clearErrors()

	await Http
		.patch<IUser>(`/collections/users/records/${auth.user.id}`, form.get())
		.then((res) => {
			auth.setUser(res)
			toast.set('Сохранено успешно!')
		})
		.catch(({ data }) => {
			form.setErrors(data)
			
			toast.set('Ошибка сохранения')
		})

	loading.value = false
}

const isWithRefCode = computed(() => auth.user.referral_code?.length > 0)
</script>

<style scoped lang="scss">
.profile {
	max-width: 768px;
}
</style>