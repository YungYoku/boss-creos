export interface IHeaderItem {
	name: string
}

export type IHeader = Array<IHeaderItem>

export interface ICell {
	key: string
	newValue: unknown
	oldValue?: unknown
}

export type IRow = Array<ICell>

export type IRows = Array<IRow>