export default {
	expands: {
		type: Object,
		default: () => ({})
	},
	total: {
		type: Array,
		default: () => ([])
	},
	options: {
		type: Object,
		default: () => ({
			sort: '',
			desc: false,
			perpage: 10,
			page: 1,
			length: 0
		})
	},
	fixed: {
		type: Number,
		default: 1
	},
	search: {
		type: String,
		default: ''
	},
	expand: {
		type: Boolean,
		default: false
	},
	adapter: {
		type: Object,
		default: () => {}
	},
	totalKeys: {
		type: Array,
		default: () => []
	},
	size: {
		type: String,
		default: 'm'
	},
	stickyHeader: {
		type: Boolean,
		default: true
	},
	flat: {
		type: Boolean,
		default: false
	},
	data: {
		type: Array,
		default: () => ([])
	},
	checkbox: {
		type: Boolean,
		default: false
	},
	isCheckboxActive: {
		type: Boolean,
		default: false
	},
	someSelected: {
		type: Boolean,
		default: false
	},
	local: {
		type: Boolean,
		default: false
	},
	wide: {
		type: Boolean,
		default: true
	},
	bufferMinimumWidth: {
		type: Number,
		default: null
	},
	showEmpty: {
		type: Boolean,
		default: false
	},
	header: {
		type: Array,
		default: () => ([])
	}
}
