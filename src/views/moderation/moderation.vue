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
	</Grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { Grid } from '@/components/structures'

const route = useRoute()
const currentTab = ref(route.path)

const tabs = [
	{
		name: 'Креативы',
		link: 'creatives'
	}
].map(item => ({
	...item,
	link: `/moderation/${item.link}`
}))
</script>

<style scoped lang="scss">
.moderation {
	&__tabs {
		display: flex;
		flex-direction: column;
		gap: 10px;

		padding: 10px;

		background: #FFFFFF;
		border-radius: 8px;
		overflow: hidden;
	}

	&__tab {
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
}
</style>