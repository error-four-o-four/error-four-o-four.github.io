import { fileURLToPath } from 'url';
import fs from 'node:fs';
import data from '../data/index.js';

import { stringToFragment } from '../utils.js';

const createSectionFragment = (name) => stringToFragment(`<section id="section-${name}"></section>`);

const createSectionContent = async (file) => {
	return await (await import(file)).default();
};

const createPromisedSectionFragment = (name, url) =>
	new Promise(async (resolve) => {
		const slug = name.toLowerCase();
		const file = `./sections/${slug}.js`;
		const path = fileURLToPath(new URL(file, url));
		const frag = createSectionFragment(slug);

		if (!fs.existsSync(path)) resolve(frag);

		frag.firstElementChild.append(await createSectionContent(file));
		resolve(frag);
	});

export default async () => {
	const { url } = import.meta;
	const frag = stringToFragment('<main></main>');
	const promises = data.sections.map((name) => createPromisedSectionFragment(name, url))
	const sections = await Promise.all(promises);

	frag.firstElementChild.append(...sections);

	// for (const name of data.sections) {
	// 	const slug = name.toLowerCase();
	// 	const file = `./sections/${slug}.js`;
	// 	const path = fileURLToPath(new URL(file, url));

	// 	const section = createSectionFragment(slug);

	// 	if (fs.existsSync(path)) {
	// 		try {
	// 			const { default: create } = await import(file);
	// 			section.innerHTML = create();
	// 			// section.append(Content(doc));
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	main.append(section);
	// }

	return frag;
};
