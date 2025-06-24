export interface IHeaderItem {
	name: string
}

export type IHeader = Array<IHeaderItem>

export interface ICell {
	key: string
	value: string | number | boolean
}

export type IRow = Array<ICell>

export type IRows = Array<IRow>