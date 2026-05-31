import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
	plugins: [vue({ features: { optionsAPI: false } })],
	test: {
		environment: 'happy-dom',
		globals: true,
		include: ['src/**/*.test.ts']
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})