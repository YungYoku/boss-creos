import {defineConfig, type ESBuildOptions} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslint from 'vite-plugin-eslint'
import stylelint from "vite-plugin-stylelint";

export default defineConfig(({ mode }) => {
	const esbuild: ESBuildOptions = { drop: [] }
	if (mode === 'production') {
		esbuild.drop = ['console', 'debugger']
	}

	return {
		esbuild,

		plugins: [
			vue(),
			eslint(),
			stylelint()
		],

		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			}
		}
	}
})
