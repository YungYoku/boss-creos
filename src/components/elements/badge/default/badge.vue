<template>
	<div class="badge">
		<slot/>
	</div>
</template>

<style scoped>
.badge {
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 4px 10px;
	font-weight: 600;
	font-size: 13px;
	border-radius: 16px;
	border: 1px solid #1D1D20;
	background: #0F0F10;
	cursor: pointer;
	user-select: none;
}
</style>