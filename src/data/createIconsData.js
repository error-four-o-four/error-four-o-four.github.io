import path from 'path';
import fs from 'fs';

import simpleicons from 'simple-icons';

const keys = [
	'siHtml5',
	'siCss3',
	'siJavascript',
	'siTypescript',

	'siNodedotjs',
	'siVitest',
	'siVite',
	'siRollupdotjs',
	'siPostcss',

	'siGithub',
	'siNpm',
	'siTwitter',
];

const urls = {
	nodedotjs: 'https://nodejs.org/en/',
	vitest: 'https://vitest.dev/',
	vite: 'https://vitejs.dev/',
	rollupdotjs: 'https://www.rollupjs.org/guide/en/',
	postcss: 'https://postcss.org/',

	html5: 'https://html.spec.whatwg.org/multipage/',
	css3: 'https://www.w3.org/Style/CSS/Overview.en.html',
	javascript: 'https://262.ecma-international.org/13.0/',
	typescript: 'https://www.typescriptlang.org/',

	github: 'https://github.com/error-four-o-four',
	npm: 'https://www.npmjs.com/~http404',
	twitter: 'https://twitter.com/error4094754562',
};

const svgs = {};

const icons = keys.reduce((all, key) => {
	const { slug, title, svg, hex } = simpleicons[key];
	const url = urls[slug];

	svgs[slug] = svg;

	return {
		...all,
		[slug]: {
			title,
			hex,
			url,
		},
	};
}, {});

const opIconSlug = 'openprocessing';

icons[opIconSlug] = {
	title: 'OpenPorcessing',
	hex: 'ffffff',
	url: 'https://openprocessing.org/user/201401?view=sketches&o=48',
};
svgs[opIconSlug] =
	'<svg role="img" viewBox="0 0 32 27" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><title>OpenProcessing</title><path style="stroke-width: 1" d="M 13.200228,0 A 13.2,13.2 0 0 0 0,13.200228 13.2,13.2 0 0 0 13.200228,26.399939 13.2,13.2 0 0 0 15.999023,26.095048 13.199961,13.2 0 0 0 18.800403,26.399939 13.199961,13.2 0 0 0 32.000114,13.200228 13.199961,13.2 0 0 0 18.800403,0 13.199961,13.2 0 0 0 16.008842,0.30334066 13.2,13.2 0 0 0 13.200228,0 Z m 0,0.99993896 a 12.2,12.2 0 0 1 0.54777,0.0129191 13.199961,13.2 0 0 0 -8.1473063,12.1873699 v 9.532235 A 12.2,12.2 0 0 1 0.99993896,13.200228 12.2,12.2 0 0 1 13.200228,0.99993896 Z m 5.600175,0 A 12.199964,12.2 0 0 1 31.000175,13.200228 12.199964,12.2 0 0 1 18.800403,25.4 12.199964,12.2 0 0 1 18.270719,25.379329 13.2,13.2 0 0 0 26.399939,13.200228 13.2,13.2 0 0 0 18.285706,1.0200928 12.199964,12.2 0 0 1 18.800403,0.99993896 Z M 16.001607,1.3270508 A 12.2,12.2 0 0 1 25.4,13.200228 12.2,12.2 0 0 1 16.000057,25.072371 12.199964,12.2 0 0 1 6.6001139,13.200228 12.199964,12.2 0 0 1 16.001607,1.3270508 Z M 6.6001139,18.22266 A 13.199961,13.2 0 0 0 13.729911,25.379329 12.2,12.2 0 0 1 13.200228,25.4 12.2,12.2 0 0 1 6.6001139,23.451282 Z" /></svg>';

const onError = (err) => err && console.error(err);

const createIconsJson = async () => {
	const file = path.join(process.cwd(), 'src', 'data', 'icons.json');
	await fs.writeFile(file, JSON.stringify(icons), onError);
};

const createSvgsJson = async () => {
	const file = path.join(process.cwd(), 'src', 'data', 'svgs.json');
	await fs.writeFile(file, JSON.stringify(svgs), onError);
};

const createSvgFiles = async () => {
	for (const [slug, svg] of Object.entries(svgs)) {
		const file = path.join(process.cwd(), 'public', 'icons', `${slug}.svg`);
		await fs.writeFile(file, svg, (err) => err && console.error(err));
	}
};

await createIconsJson();
await createSvgsJson();
// await createSvgFiles();
