import { describe, it, expect } from 'vitest'
import { format } from '@/plugins/format'

describe('format.get', () => {
	describe('percent', () => {
		it('formats as percentage with 2 decimal places', () => {
			expect(format.get('percent', 1.5)).toBe('1.50%')
		})

		it('formats zero', () => {
			expect(format.get('percent', 0)).toBe('0.00%')
		})

		it('formats 100', () => {
			expect(format.get('percent', 100)).toBe('100.00%')
		})

		it('formats value without decimals', () => {
			expect(format.get('percent', 42)).toBe('42.00%')
		})

		it('rounds to 2 decimal places', () => {
			expect(format.get('percent', 1.236)).toBe('1.24%')
		})
	})

	describe('number', () => {
		it('formats with 1 decimal by default', () => {
			expect(format.get('number', 1.5)).toBe('1.5')
		})

		it('formats zero with 1 decimal', () => {
			expect(format.get('number', 0)).toBe('0.0')
		})

		it('accepts custom decimal length', () => {
			expect(format.get('number', 1.567, 2)).toBe('1.57')
		})

		it('accepts 3 decimal places', () => {
			expect(format.get('number', 1.2345, 3)).toBe('1.234')
		})

		it('formats integer with trailing zeros', () => {
			expect(format.get('number', 5, 2)).toBe('5.00')
		})
	})
})
