import { describe, it, expect, beforeEach } from 'vitest'
import Storage from '@/plugins/storage'

describe('Storage', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	describe('write + load roundtrip', () => {
		it('stores and retrieves a string', () => {
			Storage.write('key', 'hello')
			expect(Storage.load('key')).toBe('hello')
		})

		it('stores and retrieves a number', () => {
			Storage.write('num', 42)
			expect(Storage.load('num')).toBe(42)
		})

		it('stores and retrieves a boolean', () => {
			Storage.write('flag', true)
			expect(Storage.load('flag')).toBe(true)
		})

		it('stores and retrieves an object', () => {
			const obj = { id: 1, name: 'Alice' }
			Storage.write('obj', obj)
			expect(Storage.load('obj')).toEqual(obj)
		})

		it('stores and retrieves an array', () => {
			const arr = [1, 'two', true]
			Storage.write('arr', arr)
			expect(Storage.load('arr')).toEqual(arr)
		})
	})

	describe('load', () => {
		it('returns null for non-existent key', () => {
			expect(Storage.load('missing')).toBeNull()
		})
	})

	describe('clear', () => {
		it('removes default keys "user" and "token"', () => {
			Storage.write('user', { id: 1 })
			Storage.write('token', 'abc123')
			Storage.write('other', 'data')

			Storage.clear()

			expect(Storage.load('user')).toBeNull()
			expect(Storage.load('token')).toBeNull()
			expect(Storage.load('other')).toBe('data')
		})

		it('removes specified keys', () => {
			Storage.write('a', 1)
			Storage.write('b', 2)
			Storage.write('c', 3)

			Storage.clear(['a', 'b'])

			expect(Storage.load('a')).toBeNull()
			expect(Storage.load('b')).toBeNull()
			expect(Storage.load('c')).toBe(3)
		})

		it('handles empty keys array without removing anything', () => {
			Storage.write('x', 'value')
			Storage.clear([])
			expect(Storage.load('x')).toBe('value')
		})
	})
})
