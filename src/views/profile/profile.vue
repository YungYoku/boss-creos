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

		<Button
			:disabled="loading"
			@click="save"
		>
			Сохранить
		</Button>
	</Grid>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useToast } from '@/stores/toast.ts'

import { Form, Http } from '@/plugins'
import { Grid } from '@/components/structures'
import { Avatar, Button, Input, Textarea } from '@/components/blocks'
import { emptyUser, IUser } from '@/interfaces/User.ts'

const auth = useAuthStore()
const toast = useToast()

const form = Form<IUser>({ ...emptyUser })

watch(() => auth.user, () => form.set(auth.user), { immediate: true })

const loading = ref(false)

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
</script>

<style scoped lang="scss">
.profile {
	max-width: 768px;
}
</style>