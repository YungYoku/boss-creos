export interface IHeaderItem {
	name: string
}

export type IHeader = Array<IHeaderItem>

export type ICellOptions = {
	handler?: () => Promise<void>
	link?: {
		new: string
		current: string
		old: string
	}
	[key: string]: unknown
}

export interface ICell {
	key: string
	newValue: unknown
	oldValue?: unknown
	options?: ICellOptions
}

export const emptyCell: ICell = {
	key: '',
	newValue: '',
	oldValue: '',
	options: {},
}

export type IRow = Array<ICell>

export type IRows = Array<IRow>