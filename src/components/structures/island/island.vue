<template>
	<div class="island">
		<slot/>
	</div>
</template>

<style scoped>
.island {
	padding: 12px;
	background: linear-gradient(180deg, rgb(255 255 255 / 10%) 0%, rgb(255 255 255 / 8%) 100%),
	radial-gradient(50% 100% at 50% 0%, rgb(255 255 255 / 10%) 0%, rgb(255 255 255 / 0%) 100%);
	border-radius: 10px;
}
</style>