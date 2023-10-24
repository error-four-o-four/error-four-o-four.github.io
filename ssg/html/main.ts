import path from 'node:path';
import fs from 'node:fs';

import prettier from 'prettier';

import paths from '../paths.js';

import body from './content/body.js';

const htmlSrc = path.resolve(paths.ssg, 'html', 'entry.html');
const cssSrc = path.resolve(paths.ssg, 'html', 'inline.css');

const filename = 'index.html';
const target = path.resolve(paths.root, filename);

(async () => {
	let html = fs.readFileSync(htmlSrc, 'utf-8');
	console.log(`Generating ${filename} ...`);

	const css = fs.readFileSync(cssSrc, 'utf-8');

	html = html.replace('<!-- CSS -->', `<style>${css}</style>`);
	html = html.replace('<!-- BODY -->', body);
	html = await prettier.format(html, { parser: 'html' });

	fs.writeFileSync(target, html, 'utf-8');
	console.log(`Written data to '${target}'`);
})();
