<template>
	<Island class="profile">
		<Grid
			:columns="1"
			vertical
		>
			<div class="profile__title">
				Редактировать
			</div>

			<Grid :columns="2">
				<InputRich
					v-model="form.username.value"
					:error="form.username.error"
					:disabled="loading"
					label="Имя"
				/>

				<InputImageRich
					v-model="form.avatar.value"
					:error="form.avatar.error"
					:disabled="loading"
					label="Аватар"
				/>
			</Grid>

			<TextareaRich
				v-model="form.description.value"
				:error="form.description.error"
				:disabled="loading"
				label="О себе"
				height="240px"
			/>

			<Button
				class="profile__save"
				:disabled="loading"
				variant="outline"
				@click="save"
			>
				Отправить на модерацию
			</Button>
		</Grid>
	</Island>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useToast } from '@/stores/toast.ts'

import { Form, Http } from '@/plugins'
import { Grid } from '@/components/structures'
import { Button, InputImageRich, InputRich, TextareaRich } from '@/components/blocks'
import { emptyUser, IUser } from '@/interfaces/User.ts'
import Island from '@/components/structures/island.vue'

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
	width: 585px;

	&__title {
		text-align: center;
		font-weight: 600;
		font-size: 20px;
	}

	&__save {
		width: 240px;
		margin: 0 auto;
	}
}
</style>