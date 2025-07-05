import { defineAsyncComponent } from 'vue'

const Cell = defineAsyncComponent(() => import('./cell/cell.vue'))
const Icon = defineAsyncComponent(() => import('./icon/icon.vue'))
const Badge = defineAsyncComponent(() => import('./badge.vue'))
const File = defineAsyncComponent(() => import('./file.vue'))
const Image = defineAsyncComponent(() => import('./image.vue'))
const Label = defineAsyncComponent(() => import('./label.vue'))
const Logo = defineAsyncComponent(() => import('./logo.vue'))
const PageTitle = defineAsyncComponent(() => import('./pageTitle.vue'))
const Separator = defineAsyncComponent(() => import('./separator.vue'))
const Skeleton = defineAsyncComponent(() => import('./skeleton.vue'))
const Text = defineAsyncComponent(() => import('./text.vue'))
const Video = defineAsyncComponent(() => import('./video.vue'))

export {
	Cell,
	Icon,
	Badge,
	File,
	Image,
	Label,
	Logo,
	PageTitle,
	Separator,
	Skeleton,
	Text,
	Video
}
