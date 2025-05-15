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
	}

	&__descriprion {
		margin: -7px 0 0 0;

		font-size: 15px;
		font-weight: 700;
		color: #F5FF00;
	}
}
</style>