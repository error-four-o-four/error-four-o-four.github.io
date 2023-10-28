import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig, normalizePath } from 'vite';

import postcssNesting from 'postcss-nested';
import postcssCustomMedia from 'postcss-custom-media';

import { minify } from 'html-minifier-terser';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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

const createTargets = () => {
	const targets = [];

	const dir = normalizePath(path.resolve(__dirname, 'data', 'projects'));

	fs.readdirSync(dir).forEach((item) => {
		const folder = path.resolve(dir, item);
		const files = fs.readdirSync(folder);
		const names = ['image', 'thumb']
			.map((name) => files.find((file) => file.startsWith(name)))
			.filter((name) => !!name);

		const srcs = names.map((name) => normalizePath(path.resolve(folder, name)));
		const dest = normalizePath(path.resolve(__dirname, 'dist', 'assets', item));

		for (const src of srcs) {
			targets.push({
				src,
				dest,
			});
		}
	});

	return targets;
};

export default defineConfig((mode) => {
	const plugins = [minifier()];

	if (mode.command === 'build') {
		plugins.push(viteStaticCopy({ targets: createTargets() }));
	}

	return {
		css: {
			postcss: {
				plugins: [postcssCustomMedia(), postcssNesting()],
			},
		},
		publicDir: false,
		plugins,
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
				'@data': fileURLToPath(new URL('./data', import.meta.url)),
			},
		},
	};
});
