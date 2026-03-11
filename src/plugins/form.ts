import { reactive, type Reactive } from 'vue'

type RawFieldValueComplicated = unknown[] | Date | File
type RawFieldValue = number | string | boolean | null | RawFieldValueComplicated

type RawSchema<Schema extends object = object> = {
	[key in keyof Schema]?: RawFieldValue | RawSchema
}

interface FormField<T> {
	type: 'field'
	value: T
	error: string | null
	isTouched: boolean
}

interface Error {
	code: string
	message: string
}
export type FormErrors<T> = {
	[K in keyof T]?: T[K] extends RawFieldValue ? Error : FormErrors<T[K]>
}

type TransformedFormFields<Schema extends RawSchema> = {
	[Key in keyof Schema]: Schema[Key] extends RawFieldValueComplicated
		? Reactive<FormField<Schema[Key]>>
		: Schema[Key] extends RawSchema
			? IForm<Schema[Key]>
			: Reactive<FormField<Schema[Key]>>
}

type IForm<Schema extends RawSchema> = TransformedFormFields<Schema> & {
	type: 'form'
	set(data: Partial<Schema>): void
	get(): Schema
	setErrors(_: FormErrors<Schema>): void
	clearErrors(): void
	reset(): void
	validate(): boolean
}

const isFile = (value: unknown): value is File => value instanceof File
const isDate = (value: unknown): value is Date => value instanceof Date
const isArray = (value: unknown): value is unknown[] => Array.isArray(value)

const Form = <Schema extends RawSchema<Schema>>(base: Schema): IForm<Schema> => {
	const isObject = (value: unknown): value is Partial<Schema>[string & keyof Schema] => {
		return (
			typeof value === 'object' &&
			value !== null &&
			!isArray(value) &&
			!isDate(value) &&
			!isFile(value)
		)
	}

	const isNestedForm = (value: unknown): value is IForm<RawSchema> => {
		return (
			value !== undefined &&
			value !== null &&
			isObject(value) &&
			'set' in value &&
			'get' in value &&
			'setErrors' in value &&
			'clearErrors' in value &&
			'reset' in value
		)
	}

	const keys = Object.keys(base) as (string & keyof Schema)[]
	const form = keys.reduce((acc, key) => {
		const value = base[key]
		if (isObject(value) && value != undefined) {
			Reflect.set(acc, key, Form(value))
		} else {
			const field: FormField<typeof value> = {
				type: 'field',
				value,
				error: null,
				isTouched: false,
			}
			Reflect.set(acc, key, reactive(field))
		}
		return acc
	}, {} as TransformedFormFields<Schema>)

	const set = (data: Partial<Schema>) => {
		for (const key of keys) {
			const field = form[key]
			const value = data[key]

			if (isNestedForm(field) && value != undefined) {
				field.set(value)
			} else {
				const newField: FormField<typeof value> = {
					type: 'field',
					value,
					error: null,
					isTouched: false,
				}
				Object.assign(field, newField)
			}
		}
	}

	const get = (): Schema => {
		const result: Schema = {} as Schema

		for (const key of keys) {
			const field = form[key]

			if (isNestedForm(field)) {
				Reflect.set(result, key, field.get())
			} else {
				Reflect.set(result, key, field.value)
			}
		}

		return JSON.parse(JSON.stringify(result))
	}

	const setErrors = (errors: FormErrors<Schema>) => {
		const errorKeys = Object.keys(errors) as (keyof FormErrors<Schema>)[]

		for (const key of errorKeys) {
			const error = errors[key]
			if (!error) continue

			const field = form[key]
			if (isNestedForm(field)) {
				field.setErrors(error)
			} else if ('message' in error) {
				field.error = error.message
				field.isTouched = false
			}
		}
	}

	const clearErrors = () => {
		for (const key of keys) {
			const field = form[key]
			if (isNestedForm(field)) {
				field.clearErrors()
			} else {
				field.error = null
				field.isTouched = false
			}
		}
	}

	const reset = () => {
		for (const key of keys) {
			const field = form[key]
			if (isNestedForm(field)) {
				field.reset()
			} else {
				const value = base[key]
				const newField: FormField<typeof value> = {
					type: 'field',
					value,
					error: null,
					isTouched: false,
				}
				Object.assign(field, newField)
			}
		}
	}

	const validate = () => {
		return true
	}

	return {
		...form,
		type: 'form',
		set,
		get,
		setErrors,
		clearErrors,
		reset,
		validate,
	}
}

export default Form