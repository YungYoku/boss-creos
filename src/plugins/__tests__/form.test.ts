import { describe, it, expect } from 'vitest'
import Form from '@/plugins/form'

describe('Form', () => {
	describe('initialization', () => {
		it('creates reactive fields from schema', () => {
			const form = Form({ name: 'Alice', age: 25, active: true })
			expect(form.name.value).toBe('Alice')
			expect(form.age.value).toBe(25)
			expect(form.active.value).toBe(true)
		})

		it('initializes fields with null error and isTouched=false', () => {
			const form = Form({ name: 'test' })
			expect(form.name.error).toBeNull()
			expect(form.name.isTouched).toBe(false)
		})

		it('sets _type to "form" on the form object', () => {
			const form = Form({ name: '' })
			expect(form._type).toBe('form')
		})

		it('sets _type to "field" on each field', () => {
			const form = Form({ name: '' })
			expect(form.name._type).toBe('field')
		})

		it('handles null as initial field value', () => {
			const form = Form({ value: null })
			expect(form.value.value).toBeNull()
		})
	})

	describe('get()', () => {
		it('returns all current field values', () => {
			const form = Form({ name: 'Bob', count: 5 })
			expect(form.get()).toEqual({ name: 'Bob', count: 5 })
		})

		it('returns a deep copy so mutations do not affect the form', () => {
			const form = Form({ name: 'Alice' })
			const snapshot = form.get()
			snapshot.name = 'mutated'
			expect(form.name.value).toBe('Alice')
		})
	})

	describe('set()', () => {
		it('updates field values', () => {
			const form = Form({ name: 'Alice', age: 20 })
			form.set({ name: 'Bob' })
			expect(form.name.value).toBe('Bob')
		})

		it('resets error and isTouched when a field is updated', () => {
			const form = Form({ name: 'Alice' })
			form.name.error = 'some error'
			form.name.isTouched = true
			form.set({ name: 'Bob' })
			expect(form.name.error).toBeNull()
			expect(form.name.isTouched).toBe(false)
		})

		it('does not affect fields not included in the set call', () => {
			const form = Form({ name: 'Alice', age: 20 })
			form.set({ name: 'Bob' })
			expect(form.age.value).toBe(20)
		})
	})

	describe('setErrors()', () => {
		it('sets error message on the specified field', () => {
			const form = Form({ name: '' })
			form.setErrors({ name: { code: 'required', message: 'Name is required' } })
			expect(form.name.error).toBe('Name is required')
		})

		it('sets isTouched to false when an error is assigned', () => {
			const form = Form({ name: '' })
			form.name.isTouched = true
			form.setErrors({ name: { code: 'err', message: 'error' } })
			expect(form.name.isTouched).toBe(false)
		})

		it('ignores keys absent from the errors object', () => {
			const form = Form({ name: '' })
			form.setErrors({})
			expect(form.name.error).toBeNull()
		})
	})

	describe('clearErrors()', () => {
		it('clears errors on all fields', () => {
			const form = Form({ name: '', email: '' })
			form.name.error = 'Name required'
			form.email.error = 'Email required'
			form.clearErrors()
			expect(form.name.error).toBeNull()
			expect(form.email.error).toBeNull()
		})

		it('resets isTouched to false on all fields', () => {
			const form = Form({ name: '' })
			form.name.isTouched = true
			form.clearErrors()
			expect(form.name.isTouched).toBe(false)
		})
	})

	describe('reset()', () => {
		it('restores original schema values', () => {
			const form = Form({ name: 'original', count: 0 })
			form.set({ name: 'changed', count: 99 })
			form.reset()
			expect(form.name.value).toBe('original')
			expect(form.count.value).toBe(0)
		})

		it('clears errors after reset', () => {
			const form = Form({ name: '' })
			form.name.error = 'some error'
			form.reset()
			expect(form.name.error).toBeNull()
		})

		it('resets isTouched after reset', () => {
			const form = Form({ name: '' })
			form.name.isTouched = true
			form.reset()
			expect(form.name.isTouched).toBe(false)
		})
	})

	describe('validate()', () => {
		it('returns true (current stub implementation)', () => {
			const form = Form({ name: '' })
			expect(form.validate()).toBe(true)
		})
	})

	describe('nested forms', () => {
		it('creates a nested IForm for object schema values', () => {
			const form = Form({ user: { name: 'Alice', age: 25 } })
			expect(form.user._type).toBe('form')
			expect(form.user.name.value).toBe('Alice')
			expect(form.user.age.value).toBe(25)
		})

		it('get() includes nested form values', () => {
			const form = Form({ user: { name: 'Alice', age: 25 } })
			expect(form.get()).toEqual({ user: { name: 'Alice', age: 25 } })
		})

		it('set() delegates to the nested form', () => {
			const form = Form({ user: { name: 'Alice', age: 25 } })
			form.set({ user: { name: 'Bob', age: 30 } })
			expect(form.user.name.value).toBe('Bob')
			expect(form.user.age.value).toBe(30)
		})

		it('clearErrors() propagates to nested form fields', () => {
			const form = Form({ user: { name: '' } })
			form.user.name.error = 'required'
			form.clearErrors()
			expect(form.user.name.error).toBeNull()
		})

		it('reset() propagates to nested form fields', () => {
			const form = Form({ user: { name: 'original' } })
			form.user.set({ name: 'changed' })
			form.reset()
			expect(form.user.name.value).toBe('original')
		})
	})
})
