<template>
	<div
		v-if="showEmpty || (data.length > 0 && bodyItems.length > 0)"
		:class="{
			'wide-table-wrap': wide || screenSizeS,
			'flat-wrap': flat
		}"
		:gradient-border="!flat"
		wide
	>
		<div
			class="table table_default"
			:class="[`size_${size}`, {
				'scroll-x': !scrollEnded,
				flat
			}]"
			@mouseleave="mouseLeaveHandler"
		>
			<div
				class="table__hover"
				:style="hoverStyle"
			/>
			<div
				v-if="fixed > 0"
				class="table__fixed"
				:class="{'table__shadow': isScrollShowed || screenSizeS}"
				:style="{
					minWidth: tablePartsWidth.fixedPart,
					maxWidth: tablePartsWidth.fixedPart
				}"
				@mousemove="onDrag($event)"
				@mouseup="onDragEnd($event)"
			>
				<div
					class="table__body"
					:style="{
						width: tablePartsWidth.fixedPart
					}"
				>
					<HeaderFixed
						:data="fixedHeader"
						:columns-width="fixedColumnsWidth"
						:options="options"
						:fixed-top="isHeaderFixedToTop"
						:sticky-header="stickyHeader"
						:checkbox="props.checkbox"
						:is-checkbox-active="props.isCheckboxActive"
						:some-selected="props.someSelected"
						:is-minimize="isMinimize"
						@change-sort="changeSort"
						@mouseover="hoverOff"
						@resize-columns="resizeColumnsFixed"
						@update-ls="updateLS"
					/>
					<RowFixed
						v-if="data.length > 0 && bodyItems.length > 0"
						:data="fixedItems"
						:options="options"
						:size="size"
						@refresh="refresh"
						@to-expand="toExpand"
						@hover="hoverOn"
					>
						<template #cell="{ cell }">
							<slot
								name="cell"
								:cell="cell"
							/>
						</template>
					</RowFixed>
				</div>
			</div>
			<div
				v-scroll-x="scrollOptions"
				class="table__inner"
				:style="{
					width: tablePartsWidth.showedCommonPart
				}"
				@mousemove="onDrag($event)"
				@mouseup="onDragEnd($event)"
				@scroll="mobileScroll"
			>
				<div
					class="table__body"
					:style="{
						width: tablePartsWidth.bodyPart
					}"
				>
					<HeaderBody
						:data="bodyHeader"
						:columns-width="bodyColumnsWidth"
						:scroll-position="scrollPosition"
						:options="options"
						:fixed-top="isHeaderFixedToTop"
						:sticky-header="stickyHeader"
						:buffer-minimum-width="bufferMinimumWidth"
						:is-minimize="isMinimize"
						@change-sort="changeSort"
						@mouseover="hoverOff"
						@resize-columns="resizeColumnsBody"
						@update-scroll="updateScroll"
						@update-ls="updateLS"
					/>
					<RowBody
						v-if="data.length > 0 && bodyItems.length > 0"
						:data="bodyItems"
						:options="options"
						:size="size"
						@hover="hoverOn"
					>
						<template #cell="{ cell }">
							<slot
								name="cell"
								:cell="cell"
							/>
						</template>
						<template #overlay="{ index }">
							<slot
								name="overlay"
								:index="index"
							/>
						</template>
					</RowBody>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import HeaderFixed from './components/_header-fixed.vue'
import HeaderBody from './components/_header-body.vue'
import RowFixed from './components/_row-fixed.vue'
import RowBody from './components/_row-body.vue'

import properties from './props.js'

// import './style.scss'

const props = defineProps(properties)

</script>
