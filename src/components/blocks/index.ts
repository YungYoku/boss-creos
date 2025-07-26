import { defineAsyncComponent } from 'vue'

const Avatar = defineAsyncComponent(() => import('./avatar/avatar.vue'))
const Button = defineAsyncComponent(() => import('./button/button.vue'))
const Calendar = defineAsyncComponent(() => import('./calendar/calendar.vue'))
const CardRating = defineAsyncComponent(() => import('./cardRating/cardRating.vue'))
const Checkbox = defineAsyncComponent(() => import('./checkbox/checkbox.vue'))
const CreativeCard = defineAsyncComponent(() => import('./creativeCard/creativeCard.vue'))
const DatePicker = defineAsyncComponent(() => import('./datePicker/datePicker.vue'))
const EmptyProjectCard = defineAsyncComponent(() => import('./projectCard/blank/emptyProjectCard.vue'))
const EmptyCreativeCard = defineAsyncComponent(() => import('./creativeCard/blank/emptyCreativeCard.vue'))
const Input = defineAsyncComponent(() => import('./input/input.vue'))
const InputFile = defineAsyncComponent(() => import('./inputFile/inputFile.vue'))
const InputImage = defineAsyncComponent(() => import('./inputImage/inputImage.vue'))
const InputVideo = defineAsyncComponent(() => import('./inputVideo/inputVideo.vue'))
const ProjectCard = defineAsyncComponent(() => import('./projectCard/projectCard.vue'))
const RatingStars = defineAsyncComponent(() => import('./ratingStars/ratingStars.vue'))
const RatingStarsEditable = defineAsyncComponent(() => import('./ratingStarsEditable/ratingStartEditable.vue'))
const Notifications = defineAsyncComponent(() => import('./notifications/notifications.vue'))
const Select = defineAsyncComponent(() => import('./select/select.vue'))
const SelectLive = defineAsyncComponent(() => import('./selectLive/selectLive.vue'))
const Switcher = defineAsyncComponent(() => import('./switcher/switcher.vue'))
const Textarea = defineAsyncComponent(() => import('./textarea/textarea.vue'))
const Toast = defineAsyncComponent(() => import('./toast/toast.vue'))
const User = defineAsyncComponent(() => import('./user/user.vue'))
const UserCard = defineAsyncComponent(() => import('./userCard/userCard.vue'))
const UserDropdown = defineAsyncComponent(() => import('./userDropdown/userDropdown.vue'))

export {
	Avatar,
	Button,
	Calendar,
	CardRating,
	Checkbox,
	CreativeCard,
	DatePicker,
	EmptyProjectCard,
	EmptyCreativeCard,
	Input,
	InputFile,
	InputImage,
	InputVideo,
	ProjectCard,
	RatingStars,
	RatingStarsEditable,
	Notifications,
	Select,
	SelectLive,
	Switcher,
	Textarea,
	Toast,
	User,
	UserCard,
	UserDropdown
}