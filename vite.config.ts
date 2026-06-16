import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import vueRouter from 'vue-router/vite'
import checker from 'vite-plugin-checker'

export default defineConfig(({ mode, command }) => {
	const isProd = mode === 'production'
	const isDev = command === 'serve'

	return {
		build: {
			rolldownOptions: {
				output: {
					minify: {
						compress: {
							dropConsole: isProd
						}
					}
				}
			}
		},

		plugins: [
			vueRouter(),
			vue({
				features: {
					optionsAPI: false
				}
			}),
			isDev &&
				checker({
					oxlint: true,
					vueTsc: true,
					typescript: true
				})
		],

		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		}
	}
})