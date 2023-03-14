import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';

import { JSDOM } from 'jsdom';
import prettier from 'prettier';
import postcss from 'postcss';
import postcssMinify from 'postcss-minify';

import simpleicons from 'simple-icons';
import data from './data/index.js';

import Navbar from './elements/navbar.js';
import Sections from './elements/sections.js';
import Footer from './elements/footer.js';

console.log(`Prerendering ...\n`);

const paths = {
	root: process.cwd(),
	pub: path.resolve(process.cwd(), 'public/'),
	src: path.resolve(process.cwd(), 'src/'),
	ssg: path.resolve(process.cwd(), 'ssg/'),
};

const svgs = {};

const createSvgs = () => {
	const to = path.resolve(paths.pub, 'svgs.json');
	fs.writeFileSync(to, JSON.stringify(svgs));
	console.log(`Written data to '${to}'\n`);
};

const createHtml = async () => {
	const from = path.resolve(paths.ssg, 'index.html');
	const dom = await JSDOM.fromFile(from);
	const doc = dom.window.document;
	console.log('Generating html');

	doc.body.append(Navbar(), await Sections(), Footer());

	// const script = { src: 'src/main.js', type: 'module' };
	// const elt = doc.createElement('script');
	// Object.entries(script).forEach(([key, val]) => elt.setAttribute(key, val));
	// doc.body.append(elt);

	const script = doc.createElement('script');
	script.setAttribute('src', 'src/main.js');
	script.setAttribute('type', 'module');
	doc.body.append(script);

	const to = path.resolve(paths.root, 'index.html');
	const html = dom.serialize();
	const formatted = prettier.format(html, { parser: 'html' });

	fs.writeFileSync(to, formatted, 'utf-8');
	console.log(`Written data to '${to}'\n`);
};

const createCss = async () => {
	//https://github.com/postcss/postcss#js-api
	const from = path.resolve(paths.ssg, 'reset.css');
	const to = path.resolve(paths.pub, 'reset.min.css');
	console.log('Generating css');

	const css = fs.readFileSync(from, 'utf-8');
	const result = await postcss([postcssMinify]).process(css, { from, to });
	fs.writeFileSync(to, result.css);
	console.log(`Written data to '${to}'\n`);
};

// ###################### execution

console.log('Mapping svg data');
// needs to be done before rendering html
data.links = data.links.map((link) => {
	// escape openprocessing etc
	if (!simpleicons[link.siSlug]) {
		svgs[link.slug] = link.svg;
		return link;
	}
	const { slug, svg, hex } = simpleicons[link.siSlug];
	delete link.siSlug;

	svgs[slug] = svg;
	link = {
		...link,
		slug,
		hex,
	};
	return link;
});

createSvgs();

await createHtml();
await createCss();
