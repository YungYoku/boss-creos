import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
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
