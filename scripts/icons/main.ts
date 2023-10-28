import fs from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import { type IconifyJSON } from '@iconify/types';
import { getIconData, iconToHTML, iconToSVG, replaceIDs } from '@iconify/utils';
import { locate } from '@iconify/json';

import prettier from 'prettier';
import { jsParserOptions } from '../prettier.options.js';

import data from './data.js';

type IconRecord = {
	name: string;
	svg: string;
};

const target = fileURLToPath(new URL('../../data/icons.ts', import.meta.url));

const generateSVG = (data: IconifyJSON, name: string) => {
	const iconData = getIconData(data, name);

	if (!iconData) return null;

	const icon = iconToSVG(iconData, {
		height: 'unset',
	});

	return iconToHTML(replaceIDs(icon.body), icon.attributes);
};

const getCustomSvg = (name: string, file: string) => {
	let svg = fs.readFileSync(file, 'utf-8');
	svg = svg.replaceAll(/\t|\r/g, '').replaceAll(/\n/g, ' ');
	return {
		name,
		svg,
	};
};

const iconsToJSONString = (array: Array<IconRecord>) => {
	const dict = array.reduce((all, icon) => {
		// @hack
		const name = icon.name === 'user-square-2' ? 'user' : icon.name;
		return Object.assign(all, { [name]: icon.svg });
	}, {});
	return JSON.stringify(dict);
};

(async () => {
	console.log(`Generating Icons ...`);

	const icons = [];

	let name = 'avatar';
	let file = fileURLToPath(
		new URL('../../data/assets/avatar-16px.svg', import.meta.url)
	);
	icons.push(getCustomSvg(name, file));

	name = 'openprocessing';
	file = fileURLToPath(new URL('./openprocessing.svg', import.meta.url));
	icons.push(getCustomSvg(name, file));

	for (const prefix in data) {
		const file = locate(prefix);
		const json = JSON.parse(fs.readFileSync(file, 'utf-8')) as IconifyJSON;
		const names = data[prefix as keyof typeof data];

		for (const name of names) {
			const svg = generateSVG(json, name);

			if (!svg) {
				console.warn(`Icon "${name}" is missing`);
				continue;
			}

			icons.push(<IconRecord>{ name, svg });
		}
	}

	let output = `// generated with node script\nexport default ${iconsToJSONString(
		icons
	)}`;
	output = await prettier.format(output, jsParserOptions);

	fs.writeFileSync(target, output, 'utf-8');
	console.log(`Written data to '${target}'`);
})();
