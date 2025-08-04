<template>
	<div class="auth-layout">
		<Page>
			<Header/>
		</Page>

		<div class="auth-layout__text _work">
			Работаем 24/7
		</div>

		<div class="auth-layout__text _fees">
			Комиссии 0%
		</div>

		<div class="auth-layout__text _approve">
			100% аппрув на FB
		</div>

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

	position: relative;

	&__content {
		width: 100%;
		margin: auto;
	}

	&__text {
		position: absolute;

		font-size: 15px;
		font-weight: 500;
		color: #F5FF00;

		cursor: default;
		filter: drop-shadow(0 0 15px rgba(245, 255, 0, 0.6));

		&._work {
			top: 20%;
			left: 30%;
			transform: rotate(-13deg);
		}

		&._fees {
			top: 30%;
			left: 42%;
			transform: rotate(20deg);
		}

		&._approve {
			bottom: 15%;
			left: 32%;
			transform: rotate(15deg);
		}
	}
}
</style>