import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src'),
			components: path.resolve(__dirname, 'src/components'),
			pages: path.resolve(__dirname, 'src/pages'),
			hooks: path.resolve(__dirname, 'src/hooks'),
			domain: path.resolve(__dirname, 'src/domain'),
			common: path.resolve(__dirname, 'src/common'),
			assets: path.resolve(__dirname, 'src/assets'),
			infrastructure: path.resolve(__dirname, 'src/infrastructure'),
		},
	},
});
