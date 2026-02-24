<template>
	<Grid
		class="moderation"
		:columns="['350px', 1]"
	>
		<div class="moderation__tabs">
			<router-link
				v-for="tab in tabs"
				:key="tab.link"
				:to="tab.link"
				class="moderation__tab"
				:class="{
					'_active': tab.link === currentTab
				}"
			>
				{{ tab.name }}
			</router-link>
		</div>

		<router-view/>

		<span
			v-if="isTabNotSelected"
			class="moderation__empty"
		>
			Не выбран пункт меню
		</span>
	</Grid>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { Grid } from '@/components/structures'
import { ADMIN, AUTH } from '@/data/permissions'

definePage({
	meta: {
		permissions: [AUTH, ADMIN],
		bgClass: 'shop'
	}
})

const route = useRoute()
const currentTab = computed(() => route.path)
const isTabNotSelected = computed(() => route.name === '/moderation/')

const tabs = [
	{
		name: 'Креативы',
		link: 'creatives'
	},
	{
		name: 'Пользователи',
		link: 'users'
	},
].map(item => ({
	...item,
	link: `/moderation/${item.link}`
}))
</script>

<style scoped>
.moderation {
	.moderation__tabs {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
		background: #FFF;
		border-radius: 8px;
		overflow: hidden;
	}

	.moderation__tab {
		padding: 6px 12px;
		background: #2264E5;
		border-radius: 6px;
		cursor: pointer;

		&._active {
			background: #001C53;
		}

		&:hover {
			background: #032b7e;
		}
	}

	.moderation__empty {
		text-align: center;
	}
}
</style>