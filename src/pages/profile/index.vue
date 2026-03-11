<template>
	<Island class="profile">
		<Grid
			:columns="1"
			vertical
		>
			<div class="profile__title">Редактировать</div>

			<Grid :columns="2">
				<InputRich
					v-model="user.username.value"
					:error="user.username.error"
					:disabled="loading"
					label="Имя"
				/>

				<InputImageRich
					v-model="user.avatar.value"
					:error="user.avatar.error"
					:disabled="loading"
					label="Аватар"
				/>
			</Grid>

			<TextareaRich
				v-model="user.description.value"
				:error="user.description.error"
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
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import { Form, Http } from '@/plugins'
import { Grid, Island } from '@/components/structures'
import { Button, InputImageRich, InputRich, TextareaRich } from '@/components/blocks'
import { emptyUser, type IUser } from '@/types/user'
import { isHttpError } from '@/plugins/http'
import { AUTH } from '@/data/permissions'

definePage({
	meta: {
		permissions: [AUTH]
	}
})

const auth = useAuthStore()
const toast = useToast()

const userBase = Form<IUser>({ ...emptyUser })
const user = Form<IUser>({ ...emptyUser })

watch(
	() => auth.user,
	() => {
		user.set(auth.user)
		userBase.set(auth.user)
	},
	{ immediate: true }
)

const loading = ref(false)

type ReadOnlyUserFields =
	| 'id'
	| 'collectionId'
	| 'collectionName'
	| 'created'
	| 'changes'
	| 'expand'
const getChanges = () => {
	const currentCreative = userBase.get()
	const updatedCreative = user.get()

	const readonlyFields: (keyof IUser)[] = [
		'id',
		'collectionId',
		'collectionName',
		'created',
		'changes',
		'expand'
	] as const
	const currentCreativeKeys = Object.keys(currentCreative) as (keyof IUser)[]
	const filteredKeys = currentCreativeKeys.filter(
		key => !readonlyFields.includes(key)
	) as (keyof Omit<IUser, ReadOnlyUserFields>)[]

	const changes: Record<string, unknown> = {}
	for (const key of filteredKeys) {
		const currentValue = currentCreative[key]
		const newValue = updatedCreative[key]
		if (currentValue !== newValue) {
			changes[key] = newValue
		}
	}

	return changes
}

const save = async () => {
	loading.value = true
	user.clearErrors()

	await Http.patch<IUser>(`/collections/users/records/${auth.user.id}`, {
		...userBase.get(),
		status: 'moderation',
		changes: getChanges()
	})
		.then(res => {
			auth.setUser(res)
			toast.set('Сохранено успешно!')
		})
		.catch((error: unknown) => {
			if (isHttpError(error)) {
				user.setErrors(error.data)
			}

			toast.set('Ошибка сохранения')
		})

	loading.value = false
}
</script>

<style scoped>
.profile {
	width: 585px;

	.profile__title {
		text-align: center;
		font-weight: 600;
		font-size: 20px;
	}

	.profile__save {
		width: 240px;
		margin: 0 auto;
	}
}
</style>