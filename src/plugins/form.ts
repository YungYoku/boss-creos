import { reactive, UnwrapRef } from 'vue'

interface IFormField<T> {
	value: T,
	error: string | null
}
type TransformedFormFields<T> = {
	[key in keyof T]: UnwrapRef<IFormField<T[key]>>
}
type IForm<I> = TransformedFormFields<I> & {
	set(_: I): void
	get(): I
	setErrors(_: Errors<I>): void
	clearErrors(): void
	reset(): void
}

interface IError {
	code: string
	message: string
}
type Errors<T> = {
	[_ in keyof T]: IError
}

const Form = <I>(base: I): IForm<I> => {
	const keys = Object.keys(base as object) as Array<keyof I>

	const form = keys.reduce((acc, key) => {
		acc[key] = reactive({
			value: base[key],
			error: null
		})

		return acc
	}, {} as TransformedFormFields<I>)

	const set = (data: I): void => {
		for (const key of keys) {
			Object.assign(form[key], {
				value: data[key],
				error: null
			})
		}
	}

	const get = () => {
		const result: I = {} as I

		for (const key of keys) {
			result[key] = form[key].value as I[keyof I]
		}

		return result
	}

	const setErrors = (errors: Errors<I>) => {
		const errorKeys: Array<keyof I> = Object.keys(errors) as Array<keyof I>

		for (const key of errorKeys) {
			form[key].error = errors[key].message
		}
	}

	const clearErrors = () => {
		for (const key of keys) {
			form[key].error = null
		}
	}

	const reset = () => {
		for (const key of keys) {
			Object.assign(form[key], {
				value: base[key],
				error: null
			})
		}
	}

	return {
		...form,
		set,
		get,
		setErrors,
		clearErrors,
		reset
	}
}

export default Form