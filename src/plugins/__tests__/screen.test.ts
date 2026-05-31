import { describe, it, expect } from 'vitest'
import screen from '@/plugins/screen'

const setWidth = (width: number) => {
	Object.defineProperty(document.body, 'clientWidth', {
		value: width,
		configurable: true
	})
	window.dispatchEvent(new Event('resize'))
}

describe('Screen', () => {
	describe('isSize()', () => {
		it('detects small screen (width <= 768)', () => {
			setWidth(500)
			expect(screen.isSize('s')).toBe(true)
		})

		it('detects medium screen (width <= 1024)', () => {
			setWidth(900)
			expect(screen.isSize('m')).toBe(true)
		})

		it('detects large screen (width <= 1280)', () => {
			setWidth(1200)
			expect(screen.isSize('l')).toBe(true)
		})

		it('detects xl screen (width <= 1440)', () => {
			setWidth(1400)
			expect(screen.isSize('xl')).toBe(true)
		})

		it('detects xl for widths above 1440', () => {
			setWidth(1920)
			expect(screen.isSize('xl')).toBe(true)
		})

		it('returns false for a non-current size', () => {
			setWidth(500) // 's'
			expect(screen.isSize('xl')).toBe(false)
		})
	})

	describe('isSmaller()', () => {
		it('returns true when current size is smaller than the target', () => {
			setWidth(500) // 's' = 768
			expect(screen.isSmaller('m')).toBe(true)
			expect(screen.isSmaller('l')).toBe(true)
			expect(screen.isSmaller('xl')).toBe(true)
		})

		it('returns false when current size equals the target', () => {
			setWidth(500) // 's'
			expect(screen.isSmaller('s')).toBe(false)
		})

		it('returns false when current size is larger than the target', () => {
			setWidth(1400) // 'xl'
			expect(screen.isSmaller('s')).toBe(false)
		})
	})

	describe('isLarger()', () => {
		it('returns true when current size is larger than the target', () => {
			setWidth(1400) // 'xl' = 1440
			expect(screen.isLarger('l')).toBe(true)
			expect(screen.isLarger('m')).toBe(true)
			expect(screen.isLarger('s')).toBe(true)
		})

		it('returns false when current size equals the target', () => {
			setWidth(1400) // 'xl'
			expect(screen.isLarger('xl')).toBe(false)
		})

		it('returns false when current size is smaller than the target', () => {
			setWidth(500) // 's'
			expect(screen.isLarger('m')).toBe(false)
		})
	})
})
