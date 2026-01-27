import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// @ts-expect-error Проблема с импортом библиотеки
import eslint from 'vite-plugin-eslint'

export default defineConfig(({ mode }) => {
	const isProduction = mode === 'production'

	return {
		esbuild: {
			drop: isProduction ? ['console', 'debugger'] : []
		},

		plugins: [
			vue(),
			eslint()
		],

		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		}
	}
})
