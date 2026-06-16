import { describe, it, expect, vi } from 'vitest'
import { datetime } from '@/plugins/datetime'

describe('datetime.get', () => {
	it('returns empty string for null', () => {
		expect(datetime.get(null)).toBe('')
	})

	it('formats Date with default type (YYYY-MM-DD)', () => {
		const date = new Date(2024, 0, 15) // Jan 15, 2024 local time
		expect(datetime.get(date)).toBe('2024-01-15')
	})

	it('pads single-digit months and days', () => {
		const date = new Date(2024, 2, 5) // Mar 5, 2024
		expect(datetime.get(date)).toBe('2024-03-05')
	})

	it('formats monthAndDay', () => {
		const date = new Date(2024, 0, 15)
		expect(datetime.get(date, 'monthAndDay')).toBe('01-15')
	})

	it('parses valid date string (local time noon to avoid boundary issues)', () => {
		expect(datetime.get('2024-01-15T12:00:00')).toBe('2024-01-15')
	})

	it('handles invalid date string with console.warn fallback', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
		const result = datetime.get('not-a-date')
		expect(warn).toHaveBeenCalledWith(
			'Invalid date string passed to Datetime.get():',
			'not-a-date'
		)
		expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
		warn.mockRestore()
	})

	it('formats time (HH:MM) using UTC hours and local minutes', () => {
		const date = new Date(2024, 0, 15, 10, 30, 45)
		const h = String(date.getUTCHours()).padStart(2, '0')
		const m = String(date.getMinutes()).padStart(2, '0')
		expect(datetime.get(date, 'time')).toBe(`${h}:${m}`)
	})

	it('formats fullTime (HH:MM:SS)', () => {
		const date = new Date(2024, 0, 15, 10, 30, 45)
		const h = String(date.getUTCHours()).padStart(2, '0')
		const m = String(date.getMinutes()).padStart(2, '0')
		const s = String(date.getSeconds()).padStart(2, '0')
		expect(datetime.get(date, 'fullTime')).toBe(`${h}:${m}:${s}`)
	})

	it('formats datetime (YYYY-MM-DD, HH:MM)', () => {
		const date = new Date(2024, 0, 15, 10, 30, 45)
		const h = String(date.getUTCHours()).padStart(2, '0')
		const m = String(date.getMinutes()).padStart(2, '0')
		expect(datetime.get(date, 'datetime')).toBe(`2024-01-15, ${h}:${m}`)
	})

	it('formats fullDatetime (YYYY-MM-DD, HH:MM:SS)', () => {
		const date = new Date(2024, 0, 15, 10, 30, 45)
		const h = String(date.getUTCHours()).padStart(2, '0')
		const m = String(date.getMinutes()).padStart(2, '0')
		const s = String(date.getSeconds()).padStart(2, '0')
		expect(datetime.get(date, 'fullDatetime')).toBe(`2024-01-15, ${h}:${m}:${s}`)
	})

	it('uses default method type when none is specified', () => {
		const date = new Date(2024, 5, 20)
		expect(datetime.get(date)).toBe('2024-06-20')
	})
})