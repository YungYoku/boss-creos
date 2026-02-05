<template>
	<div class="field-wrapper-rich">
		<div class="field-wrapper-rich__content">
			<div
				v-if="label"
				class="field-wrapper-rich__label"
			>
				<Icon
					name="circle"
					:colors="['dark', 'light']"
				/>

				{{ label }}
			</div>

			<slot/>
		</div>

		<span
			v-if="error"
			class="field-wrapper-rich__error"
		>
			{{ error }}
		</span>
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@/components/elements'

interface Props {
	label?: string
	error?: string | null
}

withDefaults(defineProps<Props>(), {
	label: '',
	error: null
})
</script>

<style lang="scss">
.field-wrapper-rich {
	&__content {
		padding: 7px 20px 7px 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		background: linear-gradient(180deg, rgb(255 255 255 / 10%) 0%, rgb(255 255 255 / 8%) 100%),
		radial-gradient(50% 100% at 50% 0%, rgb(255 255 255 / 10%) 0%, rgb(255 255 255 / 0%) 100%);
		border-image-source: linear-gradient(135.28deg, rgb(255 255 255 / 30%) -128.53%, rgb(255 255 255 / 0%) 75.12%),
		linear-gradient(174.85deg, rgb(255 255 255 / 10%) 0.61%, rgb(255 255 255 / 0%) 18.03%);
		border-radius: 9px;
	}

	&__label {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 10px;
		font-weight: 500;
		font-size: 14px;
		line-height: 1.5;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__error {
		padding-left: 12px;
		font-size: 12px;
		font-weight: 200;
		color: hsl(var(--destructive));
	}
}
</style>>