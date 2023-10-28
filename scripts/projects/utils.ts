import fs from 'node:fs';
// import { sep } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import imageSize from 'image-size';

import { type ProjectBase, type ProjectImage } from '@data/types.js';

const directoryPath = fileURLToPath(
	new URL('../../data/projects', import.meta.url)
);

export const folderUrls = fs.readdirSync(directoryPath).reduce(
	(all, folderName) => {
		const items = folderName.split('-');
		const key: string = !/-/g.test(folderName)
			? folderName
			: [
					items[0],
					items
						.slice(1)
						.map(
							(folder) => folder[0].toLocaleUpperCase() + folder.substring(1)
						),
			  ].join('');

		const url = new URL(`../../data/projects/${folderName}/`, import.meta.url);

		return Object.assign(all, { [key]: url });
	},
	<Urls>{}
);

export const getFolderNameFromUrl = (url: URL) =>
	url.pathname
		.split('/')
		.filter((item) => !!item)
		.at(-1);

export type Urls = {
	[x: string]: URL;
};

// import data.ts files
export const getData = async (url: URL) => {
	const file = url.href + '/data.ts';

	try {
		return (await import(file).then((module) => module.default)) as ProjectBase;
	} catch (error) {
		console.warn('No data.ts file found', url.pathname, error);
		return null;
	}
};

// read files in project folder
export const getImageFileNames = (url: URL) => {
	const files = fs.readdirSync(url);
	const names = ['image', 'thumb']
		.map((name) => files.find((file) => file.startsWith(name)))
		.filter((name) => !!name);

	if (names.length < 2) console.warn('No image files found', url.pathname);

	return names;
};

// const root = process.cwd().split(sep).at(-1)!;

// // url: URL => 'data/projects/project/image.jpg'
// export const getImageSrc = (url: URL, file: string) => {
// 	return '.' + (url.pathname.split(root)[1] + file);
// };

// read image properties width, height
export const getImageData = (url: URL, file: string) => {
	const imagePath = fileURLToPath(
		new URL(`${url.href}/${file}`, import.meta.url)
	);

	const folder = getFolderNameFromUrl(url);
	const src = `${folder}/${file}`;

	try {
		const { width, height } = imageSize(imagePath);
		return {
			src,
			width,
			height,
		} as ProjectImage;
	} catch (error) {
		console.warn(error);
		return null;
	}
};
