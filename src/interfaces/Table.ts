export interface IHeaderItem {
	name: string
}

export type IHeader = Array<IHeaderItem>

export type ICellOptions = {
	handler?: () => Promise<void>
	link?: {
		new: string
		current: string
	}
	[key: string]: unknown
}

export interface ICell {
	key: string
	newValue: unknown
	currentValue?: unknown
	options?: ICellOptions
}

export const emptyCell: ICell = {
	key: '',
	newValue: '',
	options: {},
}

export type IRow = Array<ICell>

export type IRows = Array<IRow>