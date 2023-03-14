import { defineConfig } from 'vite';

import postcssNesting from 'postcss-nested';
import postcssCustomMedia from 'postcss-custom-media'

export default defineConfig({

	css: {
		postcss: {
			plugins: [postcssCustomMedia(), postcssNesting()],
		},
	},
})