<template>
	<div class="auth-layout">
		<Page>
			<Header/>
		</Page>

		<div class="auth-layout__content">
			<slot/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Page } from '@/components/structures'
import { Header } from '@/components/sections'
</script>

<style scoped lang="scss">
.auth-layout {
    display: flex;
    flex-direction: column;
    align-items: center;

	width: 100%;
	min-height: 100vh;
    gap: 10px;

	&__content {
		width: 100%;
		margin: auto;
	}
}
</style>