type data = number | string | boolean | object | (number | string | boolean | object)[]

class Storage {
	write(key: string, data: data) {
		localStorage[key] = JSON.stringify(data)
	}

	load(key: string) {
		const data = localStorage[key]
		try {
			if (data) {
				return JSON.parse(data)
			}
		} catch {
			return null
		}
	}

	clear() {
		localStorage.removeItem('user')
		localStorage.removeItem('token')
	}
}

export default new Storage()