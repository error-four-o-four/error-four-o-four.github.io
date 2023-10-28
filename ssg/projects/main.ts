import fs from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import prettier from 'prettier';

import { type Project } from '@data/types';

import {
	folderUrls,
	type Urls,
	getData,
	getImageFileNames,
	getImageData,
	getFolderNameFromUrl,
} from './utils.js';

const getProjects = async (urls: Urls) => {
	// execute
	let result = {};

	for (const [key, url] of Object.entries(urls)) {
		let data = await getData(url);

		if (!data) continue;

		const folderName = getFolderNameFromUrl(url);
		const [imageFilename, thumbFilename] = getImageFileNames(url);

		if (imageFilename && thumbFilename) {
			const image = getImageData(url, imageFilename);
			const thumb = `${folderName}/${thumbFilename}`;

			if (image) {
				data = Object.assign(data, {
					image,
					thumb,
				});
			}
		}

		result = Object.assign(result, {
			[key]: data,
		});
	}

	return result as { [x: string]: Project };
};

(async () => {
	const toOutput = async (input: string) =>
		await prettier.format(
			`// generated with node script\nexport default ${input}`,
			{ parser: 'espree' }
		);

	const toFile = (target: string, data: string) => {
		fs.writeFileSync(target, data, 'utf-8');
		console.log(`Written data to '${target}'`);
	};

	const projects = await getProjects(folderUrls);

	const targets = ['projects.dict.ts', 'projects.list.ts'].map((target) =>
		fileURLToPath(new URL(`../../data/${target}`, import.meta.url))
	);

	let output = await toOutput(JSON.stringify(projects, null, 2));
	toFile(targets[0], output);

	output = await toOutput(JSON.stringify(Object.values(projects), null, 2));
	toFile(targets[1], output);
})();
