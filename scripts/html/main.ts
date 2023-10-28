import fs from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import prettier from 'prettier';
import { htmlParserOptions } from '../prettier.options.js';

import body from './content/body.js';

const htmlSrc = fileURLToPath(new URL('./entry.html', import.meta.url));
const cssSrc = fileURLToPath(new URL('./inline.css', import.meta.url));

const target = fileURLToPath(new URL('../../index.html', import.meta.url));

(async () => {
	console.log(`Generating HTML file ...`);

	const css = fs.readFileSync(cssSrc, 'utf-8');

	let html = fs.readFileSync(htmlSrc, 'utf-8');
	html = html.replace('<!-- CSS -->', `<style>${css}</style>`);
	html = html.replace('<!-- BODY -->', body);
	html = await prettier.format(html, htmlParserOptions);

	fs.writeFileSync(target, html, 'utf-8');
	console.log(`Written data to '${target}'`);
})();
