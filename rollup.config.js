import { minify } from 'rollup-plugin-esbuild-minify';

import postcss from 'rollup-plugin-postcss';
import nestedcss from 'postcss-nested';
import importcss from 'postcss-import';
import customMedia from 'postcss-custom-media'

export default CLIArgs => {
	const devMode = !!CLIArgs.w;
	const plugins = [
		postcss({
			inject: false,
			extract: 'bundle.min.css',
			plugins: [
				nestedcss(),
				importcss(),
				customMedia(),
			],
			minimize: !devMode,
		}),
	]

	if (!devMode) {
		plugins.push(minify());
		console.log('Build for Production.')
	}

	return [
		{
			input: './src/animation.js',
			output: {
				file: './public/animation.min.js',
				format: 'iife'
			},
			plugins
		},
		{
			input: './src/index.js',
			output: {
				file: './public/bundle.min.js',
				format: 'es',
				// name: 'bundle'
			},
			plugins
		}
	]
};