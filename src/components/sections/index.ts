import { defineAsyncComponent } from 'vue'

import Header from './header/header.vue'

const AuthSlots = defineAsyncComponent(() => import('./authSlots/authSlots.vue'))
const Chat = defineAsyncComponent(() => import('./chat/chat.vue'))
const ModalDeleteConfirmation = defineAsyncComponent(() => import('./modal/deleteConfirmation/modalDeleteConfirmation.vue'))
const ModalMakeProposal = defineAsyncComponent(() => import('./modal/makeProposal/modalMakeProposal.vue'))
const ModalProposals = defineAsyncComponent(() => import('./modal/proposals/modalProposals.vue'))
const Rating = defineAsyncComponent(() => import('./rating/rating.vue'))

export {
	AuthSlots,
	Chat,
	Header,
	ModalDeleteConfirmation,
	ModalMakeProposal,
	ModalProposals,
	Rating
}