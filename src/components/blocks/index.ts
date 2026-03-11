import { defineAsyncComponent } from 'vue'

const Avatar = defineAsyncComponent(() => import('./avatar/avatar.vue'))
const Button = defineAsyncComponent(() => import('./button/button.vue'))
const Calendar = defineAsyncComponent(() => import('./calendar/calendar.vue'))
const Checkbox = defineAsyncComponent(() => import('./checkbox/checkbox.vue'))
const CreativeCard = defineAsyncComponent(() => import('./creativeCard/creativeCard.vue'))
const DatePicker = defineAsyncComponent(() => import('./datePicker/datePicker.vue'))
const EmptyProjectCard = defineAsyncComponent(
	() => import('./projectCard/blank/emptyProjectCard.vue')
)
const EmptyCreativeCard = defineAsyncComponent(
	() => import('./creativeCard/blank/emptyCreativeCard.vue')
)
const Input = defineAsyncComponent(() => import('./input/default/input.vue'))
const InputRich = defineAsyncComponent(() => import('./input/rich/inputRich.vue'))
const InputFile = defineAsyncComponent(() => import('./inputFile/inputFile.vue'))
const InputImage = defineAsyncComponent(() => import('./inputImage/default/inputImage.vue'))
const InputImageRich = defineAsyncComponent(() => import('./inputImage/rich/inputImageRich.vue'))
const InputVideo = defineAsyncComponent(() => import('./inputVideo/default/inputVideo.vue'))
const InputVideoRich = defineAsyncComponent(() => import('./inputVideo/rich/inputVideoRich.vue'))
const ProjectCard = defineAsyncComponent(() => import('./projectCard/projectCard.vue'))
const RatingStars = defineAsyncComponent(() => import('./ratingStars/ratingStars.vue'))
const RatingStarsEditable = defineAsyncComponent(
	() => import('./ratingStarsEditable/ratingStartEditable.vue')
)
const Notifications = defineAsyncComponent(() => import('./notifications/notifications.vue'))
const Select = defineAsyncComponent(() => import('./select/default/select.vue'))
const SelectRich = defineAsyncComponent(() => import('./select/rich/selectRich.vue'))
const SelectLive = defineAsyncComponent(() => import('./selectLive/default/selectLive.vue'))
const SelectLiveRich = defineAsyncComponent(() => import('./selectLive/rich/selectLiveRich.vue'))
const Switcher = defineAsyncComponent(() => import('./switcher/default/switcher.vue'))
const SwitcherRich = defineAsyncComponent(() => import('./switcher/rich/switcherRich.vue'))
const Textarea = defineAsyncComponent(() => import('./textarea/default/textarea.vue'))
const TextareaRich = defineAsyncComponent(() => import('./textarea/rich/textareaRich.vue'))
const Toast = defineAsyncComponent(() => import('./toast/toast.vue'))
const User = defineAsyncComponent(() => import('./user/user.vue'))
const UserCard = defineAsyncComponent(() => import('./userCard/userCard.vue'))
const UserDropdown = defineAsyncComponent(() => import('./userDropdown/userDropdown.vue'))

export {
	Avatar,
	Button,
	Calendar,
	Checkbox,
	CreativeCard,
	DatePicker,
	EmptyProjectCard,
	EmptyCreativeCard,
	Input,
	InputRich,
	InputFile,
	InputImage,
	InputImageRich,
	InputVideo,
	InputVideoRich,
	ProjectCard,
	RatingStars,
	RatingStarsEditable,
	Notifications,
	Select,
	SelectRich,
	SelectLive,
	SelectLiveRich,
	Switcher,
	SwitcherRich,
	Textarea,
	TextareaRich,
	Toast,
	User,
	UserCard,
	UserDropdown
}