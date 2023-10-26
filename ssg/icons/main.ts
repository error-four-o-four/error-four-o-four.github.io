import path from 'node:path';
import fs from 'node:fs';

import { type IconifyJSON } from '@iconify/types';
import { getIconData, iconToHTML, iconToSVG, replaceIDs } from '@iconify/utils';
import { locate } from '@iconify/json';

import prettier from 'prettier';

import data from './data.js';
import paths from '../paths.js';

type IconRecord = {
	name: string;
	svg: string;
};

const filename = 'icons.ts';
const target = path.resolve(paths.src, 'data', filename);

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
	const icons = [];
	console.log(`Generating ${filename} ...`);

	let name = 'avatar';
	let file = path.resolve(paths.pub, 'assets', 'avatar-16px.svg');
	icons.push(getCustomSvg(name, file));

	name = 'openprocessing';
	file = path.resolve(paths.ssg, 'icons', name + '.svg');
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
	output = await prettier.format(output, { parser: 'espree' });

	fs.writeFileSync(target, output, 'utf-8');
	console.log(`Written data to '${target}'`);
})();
