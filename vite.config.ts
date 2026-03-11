import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import vueRouter from 'vue-router/vite'
import checker from 'vite-plugin-checker'

export default defineConfig(({ mode }) => {
	const isProd = mode === 'production'

	return {
		esbuild: {
			drop: isProd ? ['console', 'debugger'] : [],
		},

		plugins: [
			vueRouter(),
			vue({
				features: {
					optionsAPI: false,
				},
			}),
			checker({
				oxlint: true,
				vueTsc: true,
				typescript: true,
			}),
		],

		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	}
})