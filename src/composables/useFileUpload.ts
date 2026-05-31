import { Http } from '@/plugins'
import type { Ref } from 'vue'

export function useFileUpload(
	fieldName: string,
	endpoint: string,
	value: Ref<string | null>,
	name: Ref<string | null>
) {
	const updateFile = async (file: File) => {
		const formData = new FormData()
		formData.append(fieldName, file)
		const { id } = await Http.post<{ id: string }>(endpoint, formData)
		name.value = file.name
		value.value = id
	}

	return { updateFile }
}
