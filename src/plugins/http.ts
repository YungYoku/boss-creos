import { useAuthStore } from '@/stores/auth'

type DBEntity<T> = T extends { items: (infer R)[] } ? R : T

type Fields<T> = T extends Record<string, any> ? (keyof T)[] : []

interface Filter {
	[key: string]: string
}

type UnwrapExpand<T> = T extends { expand?: infer E }
	? E
	: T extends { record: { expand?: infer F } }
		? F
		: T extends { items: { expand?: infer R }[] }
			? R
			: never

type Prev = [never, 0, 1, 2, 3, 4, 5]
type FullRequired<T, D extends number = 5> = D extends 0
	? T
	: T extends Record<string, any>
		? {
				[key in keyof T]-?: FullRequired<T[key], Prev[D]>
			}
		: T

type UnwrapArray<T> = T extends (infer U)[] ? U : T

type GetExpandKeys<E> =
	E extends Record<string, any>
		? {
				[key in keyof E]-?: UnwrapArray<E[key]> extends { expand?: infer T }
					? (key & string) | `${key & string}.${GetExpandKeys<T>}`
					: key & string
			}[keyof E]
		: never

type Expand<T> =
	UnwrapExpand<T> extends never ? never : GetExpandKeys<FullRequired<UnwrapExpand<T>>>[]

interface Query<T extends object> {
	fields?: Fields<DBEntity<T>>
	filter?: Filter
	expand?: Expand<DBEntity<T>>
	perPage?: number
	page?: number
	sort?: string
}

interface HeadersOptions {
	isFormData?: boolean
	isSSE?: boolean
}

interface ConnectOptions<T extends object> {
	collection: string
	id: string
	expand?: Expand<DBEntity<T>>

	cb: (response: T) => Promise<void>
}

interface HTTPError {
	status: number
	message: string
	data: object
}

export const isHttpError = (error: unknown): error is HTTPError => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'data' in error &&
		'message' in error &&
		'status' in error
	)
}

class Http {
	api: string = import.meta.env.VITE_API

	getHeaders(
		token: string,
		options: HeadersOptions = {
			isFormData: false,
			isSSE: false
		}
	) {
		const headers: Record<string, string> = {
			Accept: 'application/json',
			Authorization: token
		}
		if (!options.isFormData) {
			headers['Content-Type'] = 'application/json'
		}
		if (options.isSSE) {
			headers['Content-Type'] = 'text/event-stream'
		}

		return headers
	}

	getFormatedFilter(filter: Filter) {
		const result = Object.keys(filter).reduce((result, key) => {
			const value = filter[key]
			if (value) {
				result += `${key}='${value}' &&`
			}

			return result
		}, '')
		return encodeURIComponent(result.slice(0, result.length - 4))
	}

	getFormatedQuery<T extends object>(query: Query<T>) {
		let result = '?'
		if (query.filter) {
			result += 'filter=' + this.getFormatedFilter(query.filter) + '&'
		}
		if (query.expand && query.expand.length > 0) {
			result += 'expand=' + query.expand.join(',') + '&'
		}
		if (query.perPage) {
			result += 'perPage=' + query.perPage.toString() + '&'
		}
		if (query.sort) {
			result += 'sort=' + query.sort + '&'
		}
		if (query.fields && query.fields.length > 0) {
			result += 'fields=' + query.fields.join(',') + '&'
		}
		return result.slice(0, -1)
	}

	async get<T extends object>(url: string, query: Query<T> | null = null): Promise<T> {
		const auth = useAuthStore()

		let _url = url
		if (query) _url += this.getFormatedQuery(query)

		return fetch(this.api + _url, {
			method: 'GET',
			headers: this.getHeaders(auth.token)
		})
			.then(response => {
				return response
					.json()
					.then(res => {
						if (response.status === 400 || response.status === 404) {
							throw res
						}
						return res
					})
					.catch((err: unknown) => {
						throw err
					})
			})
			.catch((err: unknown) => {
				throw err
			})
	}

	async post<T extends object>(
		url: string,
		body: object | FormData = {},
		query: Query<T> | null = null
	): Promise<T> {
		const auth = useAuthStore()

		let _url = url
		if (query) _url += this.getFormatedQuery(query)

		const _body = body instanceof FormData ? body : JSON.stringify(body)

		return fetch(this.api + _url, {
			method: 'POST',
			headers: this.getHeaders(auth.token, {
				isFormData: body instanceof FormData
			}),
			body: _body
		})
			.then(response => {
				return response
					.json()
					.then(res => {
						if (response.status === 400 || response.status === 404) {
							throw res
						}
						return res
					})
					.catch((err: unknown) => {
						throw err
					})
			})
			.catch((err: unknown) => {
				throw err
			})
	}

	async patch<T extends object>(
		url: string,
		body: object | FormData = {},
		query: Query<T> | null = null
	): Promise<T> {
		const auth = useAuthStore()

		let _url = url
		if (query) _url += this.getFormatedQuery(query)

		const _body = body instanceof FormData ? body : JSON.stringify(body)

		return fetch(this.api + _url, {
			method: 'PATCH',
			headers: this.getHeaders(auth.token, {
				isFormData: body instanceof FormData
			}),
			body: _body
		})
			.then(response => {
				return response
					.json()
					.then(res => {
						if (response.status === 400 || response.status === 404) {
							throw res
						}
						return res
					})
					.catch((err: unknown) => {
						throw err
					})
			})
			.catch((err: unknown) => {
				throw err
			})
	}

	async delete<T extends object>(url: string, query: Query<T> | null = null): Promise<Response> {
		const auth = useAuthStore()

		let _url = url
		if (query) _url += this.getFormatedQuery(query)

		return fetch(this.api + _url, {
			method: 'DELETE',
			headers: this.getHeaders(auth.token)
		})
			.then(response => {
				if (response.status === 204) {
					return new Promise(resolve => {
						resolve({})
					})
				}

				return response
					.json()
					.then(res => {
						if (response.status === 400 || response.status === 404) {
							throw res
						}
						return res
					})
					.catch((err: unknown) => {
						throw err
					})
			})
			.catch((err: unknown) => {
				throw err
			})
	}

	setSubscription(url: string, clientId: string): Promise<Response> {
		const auth = useAuthStore()

		const body = JSON.stringify({
			clientId,
			subscriptions: [url]
		})

		return fetch(this.api + '/realtime', {
			method: 'POST',
			headers: this.getHeaders(auth.token),
			body
		})
	}

	eventSource: EventSource | null = null
	connect<T extends object>(
		options: ConnectOptions<T> = {
			collection: '',
			id: '',
			cb: () =>
				new Promise(resolve => {
					resolve()
				})
		}
	): void {
		const url = `${options.collection}/${options.id}`

		const request = async () => {
			const body: Query<T> = {}
			if (options.expand) {
				body.expand = options.expand
			}
			return await this.get<T>(
				`/collections/${options.collection}/records/${options.id}`,
				body
			)
		}

		if (this.eventSource) this.eventSource.close()
		this.eventSource = new EventSource(this.api + '/realtime')
		this.eventSource.addEventListener(
			'PB_CONNECT',
			(event: MessageEvent) => {
				const data = JSON.parse(event.data)
				void this.setSubscription(url, data.clientId)
			},
			{ once: true }
		)

		void request().then(response => {
			void options.cb(response)
		})
		this.eventSource.addEventListener(url, () => {
			void request().then(response => {
				void options.cb(response)
			})
		})
	}
}

export default new Http()