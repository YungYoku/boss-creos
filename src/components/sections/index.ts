import { defineAsyncComponent } from 'vue'

const AuthSlots = defineAsyncComponent(() => import('./authSlots.vue'))
const Chat = defineAsyncComponent(() => import('./chat.vue'))
import Footer from './footer.vue'
import Header from './header.vue'
const ModalDeleteConfirmation = defineAsyncComponent(() => import('./modalDeleteConfirmation.vue'))
const ModalMakeProposal = defineAsyncComponent(() => import('./modalMakeProposal.vue'))
const ModalProposals = defineAsyncComponent(() => import('./modalProposals.vue'))
const Rating = defineAsyncComponent(() => import('./rating.vue'))

export {
	AuthSlots,
	Chat,
	Footer,
	Header,
	ModalDeleteConfirmation,
	ModalMakeProposal,
	ModalProposals,
	Rating
}