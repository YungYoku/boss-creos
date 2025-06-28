export interface IHeaderItem {
	name: string
}

export type IHeader = Array<IHeaderItem>

export interface ICell {
	key: string
	value: unknown
}

export type IRow = Array<ICell>

export type IRows = Array<IRow>