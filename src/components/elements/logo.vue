<template>
	<router-link
		to="/"
		class="logo"
	>
		<span class="logo__name">Boss Creos</span>
		<span class="logo__descriprion">Работаем 24/7</span>
	</router-link>
</template>

<style scoped lang="scss">
.logo {
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	max-width: 182px;

	line-height: 1;

	&__name {
		font-size: 32px;
		font-weight: 700;
		color: #ffffff;

		filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
	}

	&__descriprion {
		margin: -7px 0 0 0;

		font-size: 15px;
		font-weight: 700;
		color: #F5FF00;

		filter: drop-shadow(0 0 10px rgba(245, 255, 0, 0.3));
	}
}
</style>