<template>
	<Grid
		:columns-xl="['300px', 1]"
		:columns-s="1"
	>
		<Grid
			vertical
			@keyup.enter="loadData"
		>
			<Input
				v-model="search"
				label="Поиск"
			/>

			<Select
				v-model="form.entity.value"
				:error="form.entity.error"
				:items="entitiesItems"
				label="Сущность"
				:clearable="false"
			/>

			<Input
				v-model="form.priceFrom.value"
				:error="form.priceFrom.error"
				label="Оплата от"
			/>

			<Input
				v-model="form.priceTo.value"
				:error="form.priceTo.error"
				label="Оплата до"
			/>

			<Checkbox
				v-model="form.tutoring.value"
				:error="form.tutoring.error"
				label="Репетиторство"
			/>

			<Button
				:disabled="loading"
				@click="loadData"
			>
				Поиск
			</Button>

			<Button
				:disabled="loading"
				@click="form.reset"
			>
				Очистить
			</Button>
		</Grid>

		<template v-if="form.entity.value === 'project'">
			<Grid
				v-if="projects.length || loading"
				:columns-xl="3"
				:columns-l="2"
				:columns-m="1"
			>
				<template v-if="loading">
					<EmptyProjectCard
						v-for="i in 8"
						:key="i"
					/>
				</template>
				<template v-else>
					<ProjectCard
						v-for="project in projects"
						:key="project.id"
						:project="project"
						:loading="loading"
					/>
				</template>
			</Grid>
			<span v-else>Нет доступных объявлений.</span>
		</template>

		<template v-else>
			<Grid
				v-if="executors.length || loading"
				:columns-xl="3"
				:columns-l="2"
				:columns-m="1"
			>
				<UserCard
					v-for="executor in executors"
					:key="executor.id"
					:user="executor"
					:loading="loading"
					link
				/>
			</Grid>
			<span v-else>Нет доступных исполнителей.</span>
		</template>
	</Grid>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useSearchStore } from '@/stores/search.ts'

import { Grid } from '@/components/structures'
import {
	EmptyProjectCard,
	ProjectCard,
	Button,
	Input,
	Select,
	UserCard,
	Checkbox,
} from '@/components/blocks'
import { IProject, IProjects } from '@/interfaces/Project.ts'
import { Datetime, Form, Http } from '@/plugins'
import { emptyUser, IUser, IUsers } from '@/interfaces/User.ts'

interface SearchForm {
	priceFrom: string
	priceTo: string
	entity: 'project' | 'executor'
	tutoring: boolean
}

const projects = ref<Array<IProject>>([])
const executors = ref<Array<IUser>>(Array(8).fill(emptyUser))

const authStore = useAuthStore()
const searchStore = useSearchStore()

const _search = ref('')
const search = computed({
	get: () => _search.value,
	set: (value) => {
		_search.value = value
		searchStore.update(value)
	}
})
watch(() => searchStore.search, (value) => {
	search.value = value
}, { immediate: true })

const form = Form<SearchForm>({
	priceFrom: '',
	priceTo: '',
	entity: 'project',
	tutoring: false
})
const entitiesItems = [
	{ id: 'project', name: 'Объявление' },
	{ id: 'executor', name: 'Исполнитель' }
]

const loading = ref(true)
const loadProjects = async () => {
	const filters = []
	let filter = ''
	let encodedFilter = ''

	if (!authStore.isAdmin) filters.push(`status='created' && deadline>='${Datetime.get(new Date())}'`)
	const searchValue = search.value?.toLowerCase?.()
	if (searchValue) filters.push(`(title_lowercase~'${searchValue}' || description_lowercase~'${searchValue}')`)
	if (form.priceFrom.value) filters.push(`price>=${form.priceFrom.value}`)
	if (form.priceTo.value) filters.push(`price<=${form.priceTo.value}`)
	filters.push(`tutoring=${form.tutoring.value}`)
	if (filters.length) {
		filter = filters.reduce((acc, filter) => filter ? `${acc} && ${filter}` : acc, '')
		filter = filter.slice(4)

		encodedFilter = encodeURIComponent(filter)
	}

	await Http
		.get<IProjects>('/collections/projects/records', {
			filter: encodedFilter,
			expand: ['creator', 'type', 'discipline'],
			perPage: 12
		})
		.then(res => {
			projects.value = res.items
		})
}

const loadUsers = async () => {
	await Http
		.get<IUsers>('/collections/users/records', {
			filter: '(role=\'executor\')',
			expand: ['university', 'rating', 'disciplines'],
			perPage: 12
		})
		.then(res => {
			executors.value = res.items
		})
}

const loadData = async () => {
	loading.value = true
	searchStore.setLoading(true)

	if (form.entity.value === 'project') {
		await loadProjects()
	} else {
		await loadUsers()
	}

	loading.value = false
	searchStore.setLoading(false)
}
watch(() => form.entity.value, loadData, { immediate: true })
</script>