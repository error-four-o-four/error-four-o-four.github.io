import path from 'node:path';
import fs from 'node:fs';

import { type IconifyJSON } from '@iconify/types';
import { getIconData, iconToHTML, iconToSVG, replaceIDs } from '@iconify/utils';
import { locate } from '@iconify/json';

import prettier from 'prettier';

import data from './data.js';
import { src, pub } from '../paths.js';

type IconRecord = {
	name: string;
	svg: string;
};

const filename = 'icons.ts';
const target = path.resolve(src, 'data', filename);

const generateSVG = (data: IconifyJSON, name: string) => {
	const iconData = getIconData(data, name);

	if (!iconData) return null;

	const icon = iconToSVG(iconData, {
		height: 'unset',
	});

	return iconToHTML(replaceIDs(icon.body), icon.attributes);
};

const generateAvatar = () => {
	const name = 'avatar';
	const file = path.resolve(pub, 'assets', 'avatar-16px.svg');
	const svg = fs.readFileSync(file, 'utf-8');
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

	icons.push(generateAvatar());

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
