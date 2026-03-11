import { defineAsyncComponent } from 'vue'

const CellActions = defineAsyncComponent(() => import('./cells/cellActions.vue'))
const CellResizePrices = defineAsyncComponent(() => import('./cells/cellResizePrices.vue'))
const Icon = defineAsyncComponent(() => import('./icon/icon.vue'))
const Badge = defineAsyncComponent(() => import('./badge/default/badge.vue'))
const BadgeBalance = defineAsyncComponent(() => import('./badge/badgeBalance/badgeBalance.vue'))
const File = defineAsyncComponent(() => import('./file/file.vue'))
const Image = defineAsyncComponent(() => import('./image/image.vue'))
const Label = defineAsyncComponent(() => import('./label/label.vue'))
const Logo = defineAsyncComponent(() => import('./logo/logo.vue'))
const PageTitle = defineAsyncComponent(() => import('./pageTitle/pageTitle.vue'))
const Separator = defineAsyncComponent(() => import('./separator/separator.vue'))
const Skeleton = defineAsyncComponent(() => import('./skeleton/skeleton.vue'))
const Text = defineAsyncComponent(() => import('./text/text.vue'))
const Video = defineAsyncComponent(() => import('./video/video.vue'))

export {
	CellActions,
	CellResizePrices,
	Icon,
	Badge,
	BadgeBalance,
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