import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

console.log('Generating data');

const { url } = import.meta;
const files = ['projects', 'about', 'links'].reduce((all, name) => {
	all[name] = fileURLToPath(new URL(`./${name}.json`, url));
	return all;
}, {});

const data = Object.entries(files).reduce((all, [name, file]) => {
	console.log(`Reading '${name}'`);
	all[name] = JSON.parse(fs.readFileSync(file, 'utf-8'));
	return all;
}, {});

data.sections = ['Welcome', 'Projects', 'About'];

console.log(`Written data\n`);

export default data;
