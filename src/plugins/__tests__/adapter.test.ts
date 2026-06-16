import { describe, it, expect } from 'vitest'
import { useAdapter } from '@/plugins/adapter'

type TestItem = {
	id: string
	name: string
	status: string
}

const schema = { id: '', name: '', status: '' } as any

const makeAdapter = (
	unnecessaryForRequest: (keyof TestItem)[] = [],
	unnecessaryForTable: (keyof TestItem)[] = [],
	cellFormats: Record<string, (v: any) => unknown> = {}
) => {
	return useAdapter(
		schema,
		unnecessaryForRequest as any,
		unnecessaryForTable as any,
		() => ({ actions: {} }),
		cellFormats as any
	)
}

describe('useAdapter', () => {
	describe('handleLoadedData with empty array', () => {
		it('sets header and body to empty arrays', () => {
			const { handleLoadedData, header, body } = makeAdapter()
			handleLoadedData([])
			expect(header.value).toEqual([])
			expect(body.value).toEqual([])
		})
	})

	describe('fields (for request)', () => {
		it('includes all schema keys by default', () => {
			const { fields } = makeAdapter()
			expect(fields).toContain('id')
			expect(fields).toContain('name')
			expect(fields).toContain('status')
		})

		it('excludes keys listed in unnecessaryFieldsForRequest', () => {
			const { fields } = makeAdapter(['status'])
			expect(fields).not.toContain('status')
			expect(fields).toContain('id')
			expect(fields).toContain('name')
		})
	})

	describe('header generation', () => {
		it('always includes an "actions" header as the first item', () => {
			const { handleLoadedData, header } = makeAdapter()
			handleLoadedData([{ id: '1', name: 'Alice', status: 'active' }])
			expect(header.value[0]?.name).toBe('actions')
		})

		it('includes all schema fields in the header', () => {
			const { handleLoadedData, header } = makeAdapter()
			handleLoadedData([{ id: '1', name: 'Alice', status: 'active' }])
			const names = header.value.map(h => h.name)
			expect(names).toContain('id')
			expect(names).toContain('name')
			expect(names).toContain('status')
		})

		it('excludes fields listed in unnecessaryFieldsForTable', () => {
			const { handleLoadedData, header } = makeAdapter([], ['id'])
			handleLoadedData([{ id: '1', name: 'Alice', status: 'active' }])
			const names = header.value.map(h => h.name)
			expect(names).not.toContain('id')
			expect(names).toContain('name')
		})
	})

	describe('body generation', () => {
		it('creates one row per item', () => {
			const { handleLoadedData, body } = makeAdapter()
			handleLoadedData([
				{ id: '1', name: 'Alice', status: 'active' },
				{ id: '2', name: 'Bob', status: 'inactive' }
			])
			expect(body.value).toHaveLength(2)
		})

		it('each row starts with an actions cell', () => {
			const { handleLoadedData, body } = makeAdapter()
			handleLoadedData([{ id: '1', name: 'Alice', status: 'active' }])
			const row = body.value[0]!
			expect(row[0]?.key).toBe('actions')
		})

		it('maps item values to currentValue in each cell', () => {
			const { handleLoadedData, body } = makeAdapter()
			handleLoadedData([{ id: '1', name: 'Alice', status: 'active' }])
			const row = body.value[0]!
			const nameCell = row.find(c => c.key === 'name')
			expect(nameCell?.currentValue).toBe('Alice')
		})

		it('applies cell format function to transform the value', () => {
			const adapter = makeAdapter([], [], {
				status: (v: string) => v.toUpperCase()
			})
			adapter.handleLoadedData([{ id: '1', name: 'Alice', status: 'active' }])
			const row = adapter.body.value[0]!
			const statusCell = row.find(c => c.key === 'status')
			expect(statusCell?.currentValue).toBe('ACTIVE')
		})

		it('prefers expand value over direct item value', () => {
			const { handleLoadedData, body } = makeAdapter()
			handleLoadedData([
				{
					id: '1',
					name: 'raw-name',
					status: 'active',
					expand: { name: 'expanded-name' }
				} as any
			])
			const row = body.value[0]!
			const nameCell = row.find(c => c.key === 'name')
			expect(nameCell?.currentValue).toBe('expanded-name')
		})

		it('sets newValue from item.changes when present', () => {
			const { handleLoadedData, body } = makeAdapter()
			handleLoadedData([
				{
					id: '1',
					name: 'Alice',
					status: 'active',
					changes: { name: 'pending-name' }
				} as any
			])
			const row = body.value[0]!
			const nameCell = row.find(c => c.key === 'name')
			expect(nameCell?.newValue).toBe('pending-name')
		})
	})
})