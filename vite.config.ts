import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import checker from 'vite-plugin-checker'

export default defineConfig(({ mode }) => {
	const isProduction = mode === 'production'

	return {
		esbuild: {
			drop: isProduction ? ['console', 'debugger'] : []
		},

		plugins: [
			vue(),
			checker({
				eslint: {
					lintCommand: 'eslint "./src/**/*.{ts,vue, js}"',
					watchPath: './src',
					useFlatConfig: true
				},
				vueTsc: true,
				typescript: true,
				// stylelint: {
				// 	lintCommand: 'stylelint ./src/**/*.{css,scss,vue}',
				// 	watchPath: './src',
				// }
			})
		],

		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		}
	}
})
