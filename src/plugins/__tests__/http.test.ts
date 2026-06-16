import { describe, it, expect } from 'vitest'
import Http, { isHttpError } from '@/plugins/http'

describe('isHttpError', () => {
	it('returns true for a valid HTTPError object', () => {
		expect(isHttpError({ status: 404, message: 'Not found', data: {} })).toBe(true)
	})

	it('returns false for null', () => {
		expect(isHttpError(null)).toBe(false)
	})

	it('returns false when "data" field is missing', () => {
		expect(isHttpError({ status: 404, message: 'error' })).toBe(false)
	})

	it('returns false when "message" field is missing', () => {
		expect(isHttpError({ status: 404, data: {} })).toBe(false)
	})

	it('returns false when "status" field is missing', () => {
		expect(isHttpError({ message: 'error', data: {} })).toBe(false)
	})

	it('returns false for strings', () => {
		expect(isHttpError('error')).toBe(false)
	})

	it('returns false for numbers', () => {
		expect(isHttpError(42)).toBe(false)
	})
})

describe('Http.getHeaders', () => {
	it('includes Authorization and Accept by default', () => {
		const headers = Http.getHeaders('Bearer token123')
		expect(headers['Authorization']).toBe('Bearer token123')
		expect(headers['Accept']).toBe('application/json')
	})

	it('includes Content-Type: application/json by default', () => {
		const headers = Http.getHeaders('token')
		expect(headers['Content-Type']).toBe('application/json')
	})

	it('omits Content-Type when isFormData is true', () => {
		const headers = Http.getHeaders('token', { isFormData: true })
		expect(headers['Content-Type']).toBeUndefined()
	})

	it('sets Content-Type to text/event-stream when isSSE is true', () => {
		const headers = Http.getHeaders('token', { isSSE: true })
		expect(headers['Content-Type']).toBe('text/event-stream')
	})
})

describe('Http.getFormatedFilterCB', () => {
	it('formats a single value with default "=" sign', () => {
		const cb = () => ({ value: ['active'] })
		expect(Http.getFormatedFilterCB('status', cb)).toBe("(status='active')")
	})

	it('joins multiple values with "&&" by default', () => {
		const cb = () => ({ value: ['a', 'b'] })
		expect(Http.getFormatedFilterCB('status', cb)).toBe("(status='a'&&status='b')")
	})

	it('uses custom "!=" sign and "||" separator', () => {
		const cb = () => ({
			value: ['x', 'y'],
			props: { sign: '!=' as const, separator: '||' as const }
		})
		expect(Http.getFormatedFilterCB('type', cb)).toBe("(type!='x'||type!='y')")
	})

	it('uses "~" sign for fuzzy match', () => {
		const cb = () => ({
			value: ['foo'],
			props: { sign: '~' as const }
		})
		expect(Http.getFormatedFilterCB('name', cb)).toBe("(name~'foo')")
	})

	it('returns empty string for empty values array', () => {
		const cb = () => ({ value: [] })
		expect(Http.getFormatedFilterCB('status', cb)).toBe('')
	})
})

describe('Http.getFormatedFilter', () => {
	it('encodes a simple string filter', () => {
		const result = Http.getFormatedFilter({ status: 'active' })
		expect(decodeURIComponent(result)).toBe("status='active'")
	})

	it('combines multiple filters with "&&"', () => {
		const result = Http.getFormatedFilter({ status: 'active', type: 'admin' })
		const decoded = decodeURIComponent(result)
		expect(decoded).toContain("status='active'")
		expect(decoded).toContain("type='admin'")
		expect(decoded).toContain('&&')
	})

	it('skips empty string values', () => {
		const result = Http.getFormatedFilter({ status: '', type: 'admin' })
		const decoded = decodeURIComponent(result)
		expect(decoded).not.toContain('status=')
		expect(decoded).toContain("type='admin'")
	})

	it('handles FilterCB values', () => {
		const result = Http.getFormatedFilter({
			status: () => ({ value: ['a', 'b'] })
		})
		expect(decodeURIComponent(result)).toBe("(status='a'&&status='b')")
	})
})

describe('Http.getFormatedQuery', () => {
	it('returns empty string for an empty query object', () => {
		// result starts as '?', nothing appended, slice(0,-1) removes '?'
		expect(Http.getFormatedQuery({})).toBe('')
	})

	it('includes perPage param', () => {
		expect(Http.getFormatedQuery({ perPage: 20 })).toContain('perPage=20')
	})

	it('includes sort param', () => {
		expect(Http.getFormatedQuery({ sort: '-created' })).toContain('sort=-created')
	})

	it('includes expand param as comma-separated list', () => {
		const result = Http.getFormatedQuery({ expand: ['user', 'files'] as any })
		expect(result).toContain('expand=user,files')
	})

	it('skips expand when array is empty', () => {
		const result = Http.getFormatedQuery({ expand: [] as any })
		expect(result).not.toContain('expand')
	})

	it('includes fields param as comma-separated list', () => {
		const result = Http.getFormatedQuery({ fields: ['id', 'name'] as any })
		expect(result).toContain('fields=id,name')
	})

	it('includes filter param', () => {
		const result = Http.getFormatedQuery({ filter: { status: 'active' } })
		expect(result).toContain('filter=')
		expect(decodeURIComponent(result)).toContain("status='active'")
	})

	it('combines multiple params', () => {
		const result = Http.getFormatedQuery({ perPage: 10, sort: 'name' })
		expect(result).toContain('perPage=10')
		expect(result).toContain('sort=name')
	})

	it('starts with "?" when at least one param is present', () => {
		const result = Http.getFormatedQuery({ perPage: 10 })
		expect(result.startsWith('?')).toBe(true)
	})
})