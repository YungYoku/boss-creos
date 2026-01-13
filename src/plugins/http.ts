import { useAuthStore } from '@/stores/auth.ts'

interface Query {
	fields?: Array<string>
	filter?: string
	expand?: Array<string>
	perPage?: number
	page?: number
	sort?: string
}

interface HeadersOptions {
	isFormData?: boolean
	isSSE?: boolean
}

interface ConnectOptions<T> {
	collection: string
	id: string
	expand: Array<string>,

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

	getHeaders(token: string, options: HeadersOptions = {
		isFormData: false,
		isSSE: false
	}) {
		const headers: { [key: string]: string } = {
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

	getFormatedQuery(query: Query) {
		let result = '?'
		if (query.filter) {
			result += 'filter=' + query.filter + '&'
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

	async get<T>(url: string, query: Query | null = null): Promise<T> {
		const auth = useAuthStore()

		let _url = url
		if (query) _url += this.getFormatedQuery(query)

		return fetch(this.api + _url, {
			method: 'GET',
			headers: this.getHeaders(auth.token)
		})
			.then((response) => {
				return response.json()
					.then((res) => {
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

	async post<T>(url: string, body: object | FormData = {}, query: Query | null = null): Promise<T> {
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
			.then((response) => {
				return response.json()
					.then((res) => {
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

	async patch<T>(url: string, body: object | FormData = {}, query: Query | null = null): Promise<T> {
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
			.then((response) => {
				return response.json()
					.then((res) => {
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

	async delete(url: string, query: Query | null = null): Promise<Response> {
		const auth = useAuthStore()

		let _url = url
		if (query) _url += this.getFormatedQuery(query)

		return fetch(this.api + _url, {
			method: 'DELETE',
			headers: this.getHeaders(auth.token)
		})
			.then((response) => {
				if (response.status === 204) {
					return new Promise((resolve) => {resolve({})})
				}

				return response.json()
					.then((res) => {
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
	connect<T>(options: ConnectOptions<T> = {
		collection: '',
		id: '',
		expand: [],
		cb: () => new Promise((resolve) => {resolve()})
	}): void {
		const url = `${options.collection}/${options.id}`

		const request = async () => {
			return await this.get<T>(`/collections/${options.collection}/records/${options.id}`, {
				expand: options.expand
			})
		}

		if (this.eventSource) this.eventSource.close()
		this.eventSource = new EventSource(this.api + '/realtime')
		this.eventSource.addEventListener('PB_CONNECT', (event: MessageEvent) => {
			const data = JSON.parse(event.data)
			void this.setSubscription(url, data.clientId)
		}, { once: true })

		void request().then((response) => {
			void options.cb(response)
		})
		this.eventSource.addEventListener(url, () => {
			void request().then((response) => {
				void options.cb(response)
			})
		})
	}
}

export default new Http()
