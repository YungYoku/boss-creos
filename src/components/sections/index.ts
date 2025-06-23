import { defineAsyncComponent } from 'vue'

import Header from './header.vue'

const AuthSlots = defineAsyncComponent(() => import('./authSlots.vue'))
const Chat = defineAsyncComponent(() => import('./chat.vue'))
const ModalDeleteConfirmation = defineAsyncComponent(() => import('./modalDeleteConfirmation.vue'))
const ModalMakeProposal = defineAsyncComponent(() => import('./modalMakeProposal.vue'))
const ModalProposals = defineAsyncComponent(() => import('./modalProposals.vue'))
const Rating = defineAsyncComponent(() => import('./rating.vue'))

export {
	AuthSlots,
	Chat,
	Header,
	ModalDeleteConfirmation,
	ModalMakeProposal,
	ModalProposals,
	Rating
}