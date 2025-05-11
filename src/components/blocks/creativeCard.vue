<template>
	<router-link
		:to="`/creative/${creative.id}`"
		class="creative-card"
	>
		<Grid vertical>
			<div class="creative-card__video"/>

			<Grid
				:columns="[1, 0]"
				ver-align="center"
			>
				<User
					link
					:user="emptyUser"
				/>

				<Icon
					:colors="['dark', 'light']"
					name="heart"
				/>
			</Grid>

			<Grid
				:columns="[1, 2]"
				ver-align="center"
				class="creative-card__info"
			>
				<div class="creative-card__price">
					{{ creative.price }}$
				</div>

				<div class="creative-card__detailed">
					Подробнее
				</div>
			</Grid>
		</Grid>
	</router-link>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Grid } from '@/components/structures'
import { User } from '@/components/blocks'
import { Icon } from '@/components/elements'
import { emptyUser } from '@/interfaces/User.ts'
import { ICreative } from '@/interfaces/Creative.ts'

defineProps({
	creative: {
		type: Object as PropType<ICreative>,
		required: true
	},
})
</script>

<style scoped lang="scss">
.creative-card {
	padding: 16px;

	background: #fff;
	border-radius: 16px;
	
	&__video {
		max-width: 100%;

		background: #FFB700;
		border-radius: 10px;
		aspect-ratio: 1 / 1;
	}
	
	&__info {
		color: #fff;

		background: #6937FF;
	}

	&__info,
	&__detailed {
		border-radius: 40px;
	}

	&__price,
	&__detailed {
		padding: 12px;

	}

	&__detailed {
		text-align: center;

		background: #4000FF;
	}
}
</style>