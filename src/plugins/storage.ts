type data = number | string | boolean | object | (number | string | boolean | object)[]

class Storage {
	write(key: string, data: data) {
		try {
			localStorage.setItem(key, JSON.stringify(data))
		} catch (err) {
			console.error('Storage write error', err)
		}
	}

	load(key: string) {
		try {
			const raw = localStorage.getItem(key)
			return raw ? JSON.parse(raw) : null
		} catch {
			return null
		}
	}

	clear(keys: string[] = ['user', 'token']) {
		keys.forEach(k => localStorage.removeItem(k))
	}
}

export default new Storage()