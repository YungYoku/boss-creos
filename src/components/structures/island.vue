<template>
	<div class="island">
		<slot/>
	</div>
</template>

<style scoped lang="scss">
.island {
	padding: 12px;

	background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.08) 100%),
	radial-gradient(50% 100% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	border-radius: 10px;
}
</style>