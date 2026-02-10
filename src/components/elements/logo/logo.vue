<template>
	<router-link
		to="/"
		class="logo"
	>
		<div class="logo__text">
			<span class="logo__name">Boss Creos</span>
			<span class="logo__description">Работаем 24/7</span>
		</div>
	</router-link>
</template>

<style scoped>
.logo {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	max-width: 182px;
	line-height: 1;

	.logo__text {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.logo__name {
		font-size: 32px;
		font-weight: 700;
		color: #fff;
		filter: drop-shadow(0 0 15px rgb(255 255 255 / 30%));
	}

	.logo__description {
		margin: -7px 0 0;
		font-size: 15px;
		font-weight: 700;
		color: #F5FF00;
		filter: drop-shadow(0 0 10px rgb(245 255 0 / 30%));
	}
}
</style>