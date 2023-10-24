import { defineConfig } from 'vite';

import postcssNesting from 'postcss-nested';
import postcssCustomMedia from 'postcss-custom-media';

import { minify } from 'html-minifier-terser';

const minifier = () => ({
	name: 'minifier',
	apply: 'build',
	enforce: 'post',
	transformIndexHtml: (html) => {
		return minify(html, {
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			minifyURLs: true,
			removeComments: true,
		});
	},
});

export default defineConfig({
	css: {
		postcss: {
			plugins: [postcssCustomMedia(), postcssNesting()],
		},
	},
	plugins: [minifier()],
});
