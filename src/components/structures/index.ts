import { defineAsyncComponent } from 'vue'

const Table = defineAsyncComponent(() => import('./table/table.vue'))
const Card = defineAsyncComponent(() => import('./card/default/card.vue'))
const CardAuth = defineAsyncComponent(() => import('./card/auth/cardAuth.vue'))
const CardLong = defineAsyncComponent(() => import('./card/long/cardLong.vue'))
const Dropdown = defineAsyncComponent(() => import('./dropdown/dropdown.vue'))
const FieldWrapperRich = defineAsyncComponent(
	() => import('./fieldWrapperRich/fieldWrapperRich.vue'),
)
const Grid = defineAsyncComponent(() => import('./grid/grid.vue'))
const Island = defineAsyncComponent(() => import('./island/island.vue'))
const Modal = defineAsyncComponent(() => import('./modal/modal.vue'))
const Page = defineAsyncComponent(() => import('./page/page.vue'))
const Popover = defineAsyncComponent(() => import('./popover/popover.vue'))
const StepByStep = defineAsyncComponent(() => import('./stepByStep/stepByStep.vue'))

export {
	Table,
	Card,
	CardAuth,
	CardLong,
	Dropdown,
	FieldWrapperRich,
	Grid,
	Island,
	Modal,
	Page,
	Popover,
	StepByStep,
}