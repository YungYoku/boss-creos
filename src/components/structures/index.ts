import { defineAsyncComponent } from 'vue'

const Table = defineAsyncComponent(() => import('./table/table.vue'))
const Card = defineAsyncComponent(() => import('./card.vue'))
const Dropdown = defineAsyncComponent(() => import('./dropdown.vue'))
const FieldWrapperRich = defineAsyncComponent(() => import('./fieldWrapperRich.vue'))
const Grid = defineAsyncComponent(() => import('./grid.vue'))
const Island = defineAsyncComponent(() => import('./island.vue'))
const Modal = defineAsyncComponent(() => import('./modal.vue'))
const Page = defineAsyncComponent(() => import('./page.vue'))
const Popover = defineAsyncComponent(() => import('./popover.vue'))
const StepByStep = defineAsyncComponent(() => import('./stepByStep.vue'))

export {
	Table,
	Card,
	Dropdown,
	FieldWrapperRich,
	Grid,
	Island,
	Modal,
	Page,
	Popover,
	StepByStep
}