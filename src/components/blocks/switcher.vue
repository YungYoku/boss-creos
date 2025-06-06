<template>
	<div
		class="switcher"
		@click="toggle"
	>
		<div
			v-if="label"
			class="switcher__label"
		>
			{{ label }}
		</div>

		<div
			class="switcher__content"
			:class="{
				'_active': isActive
			}"
		>
			<div
				class="switcher__content-icon"
				:class="{
					'_active': isActive
				}"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
	error?: string | null,
	checked?: boolean,
	disabled?: boolean
	label: string
}

const props = withDefaults(defineProps<Props>(), {
	error: null,
	checked: false,
	disabled: false,
	label: ''
})

const value = defineModel<boolean>({
	type: Boolean,
	default: null
})

const toggle = () => {
	value.value = !value.value
}

const isActive = computed(() => value.value ?? props.checked)
</script>

<style scoped lang="scss">
.switcher {
	display: flex;
	justify-content: space-between;
	align-items: center;

	cursor: pointer;

	&__label {
		font-weight: 300;
		text-align: left;
	}

	&__content {
		width: 120px;
		height: 48px;
		padding: 12px;

		background: hsl(var(--background));
		border: 1px solid hsl(var(--input));
		border-radius: 14px;

		&._active {
			background: var(--active);
		}
	}

	&__content-icon {
		width: 22px;
		height: 22px;
		margin: 0 calc(100% - 24px) 0 0;

		background: #ffffff;
		border-radius: 6px;

		&._active {
			margin: 0 0 0 calc(100% - 24px);
		}
	}
}
</style>