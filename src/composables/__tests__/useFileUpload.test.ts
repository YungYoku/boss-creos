import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useFileUpload } from '@/composables/useFileUpload'
import { Http } from '@/plugins'

describe('useFileUpload', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('calls Http.post with the correct endpoint and FormData', async () => {
		const postSpy = vi.spyOn(Http, 'post').mockResolvedValue({ id: 'file-id' } as any)
		const value = ref<string | null>(null)
		const name = ref<string | null>(null)

		const { updateFile } = useFileUpload('avatar', '/api/files', value, name)
		const file = new File(['content'], 'photo.jpg', { type: 'image/jpeg' })

		await updateFile(file)

		expect(postSpy).toHaveBeenCalledWith('/api/files', expect.any(FormData))
	})

	it('appends the file under the specified field name in FormData', async () => {
		const postSpy = vi.spyOn(Http, 'post').mockResolvedValue({ id: 'abc' } as any)
		const value = ref<string | null>(null)
		const name = ref<string | null>(null)

		const { updateFile } = useFileUpload('document', '/docs', value, name)
		const file = new File(['data'], 'report.pdf')

		await updateFile(file)

		const formData = postSpy.mock.calls[0]![1] as FormData
		expect(formData.get('document')).toBe(file)
	})

	it('updates value ref with the id returned by the API', async () => {
		vi.spyOn(Http, 'post').mockResolvedValue({ id: 'returned-id' } as any)
		const value = ref<string | null>(null)
		const name = ref<string | null>(null)

		const { updateFile } = useFileUpload('file', '/upload', value, name)
		await updateFile(new File([''], 'test.txt'))

		expect(value.value).toBe('returned-id')
	})

	it('updates name ref with the uploaded file name', async () => {
		vi.spyOn(Http, 'post').mockResolvedValue({ id: 'xyz' } as any)
		const value = ref<string | null>(null)
		const name = ref<string | null>(null)

		const { updateFile } = useFileUpload('file', '/upload', value, name)
		await updateFile(new File([''], 'my-document.pdf'))

		expect(name.value).toBe('my-document.pdf')
	})
})
