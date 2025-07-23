import { reactive, UnwrapNestedRefs } from 'vue'

interface IFormField<T> {
	value: T extends object ? (T extends unknown[] | Date ? T : IForm<T>) : T;
	error: string | null;
}
type TransformedFormFields<T> = {
	[key in keyof T]: UnwrapNestedRefs<IFormField<T[key]>>
}
type IForm<I> = TransformedFormFields<I> & {
	set(_: I): void
	get(): I
	setErrors(_: Partial<Errors<I>>): void
	clearErrors(): void
	reset(): void
}

interface IError {
	code: string
	message: string
}
type Errors<T> = {
	[key in keyof T]: T[key] extends object ? Errors<T[key]> : IError
}

const isObject = (value: unknown): value is object => {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const Form = <I extends object>(base: I): IForm<I> => {
	const form = (Object.keys(base as object) as Array<keyof I>)
		.reduce((acc, key) => {
			const value = base[key]
			if (isObject(value)) {
				acc[key] = reactive({
					value: Form(value),
					error: null
				}) as UnwrapNestedRefs<IFormField<typeof value>>
			} else {
				acc[key] = reactive({
					value: value,
					error: null
				}) as UnwrapNestedRefs<IFormField<typeof value>>
			}
			return acc
		}, {} as TransformedFormFields<I>)
	const keys = Object.keys(form) as Array<keyof typeof form>

	const set = (data: I) => {
		for (const key of keys) {
			const formValue = form[key] as I[keyof I] | IForm<I[keyof I]>
			if (isObject(formValue) && 'set' in formValue) {
				formValue.set(data[key])
			} else {
				Object.assign(form[key], {
					value: data[key],
					error: null
				})
			}
		}
	}

	const get = () => {
		const result: I = {} as I

		for (const key of keys) {
			const value = form[key].value as I[keyof I] | IForm<I[keyof I]>
			if (isObject(value) && 'get' in value) {
				result[key] = value.get()
			} else {
				result[key] = value
			}
		}

		return result
	}

	const setErrors = (errors: Errors<I>) => {
		const errorKeys: Array<keyof I> = Object.keys(errors) as Array<keyof I>

		for (const key of errorKeys) {
			const formValue = form[key] as I[keyof I] | IForm<I[keyof I]>
			if (isObject(formValue) && 'setErrors' in formValue) {
				const _errors = errors[key] as Errors<I[keyof I]>
				formValue.setErrors(_errors)
			} else {
				const error = errors[key] as IError
				form[key].error = error.message
			}
		}
	}

	const clearErrors = () => {
		for (const key of keys) {
			const formValue = form[key] as I[keyof I] | IForm<I[keyof I]>
			if (isObject(formValue) && 'clearErrors' in formValue) {
				formValue.clearErrors()
			} else {
				form[key].error = null
			}
		}
	}

	const reset = () => {
		for (const key of keys) {
			const formValue = form[key] as I[keyof I] | IForm<I[keyof I]>
			if (isObject(formValue) && 'reset' in formValue) {
				formValue.reset()
			} else {
				Object.assign(form[key], {
					value: base[key],
					error: null
				})
			}
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