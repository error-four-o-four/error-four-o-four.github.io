import { assertInstanceOf } from '../utils.js';

import ids, { type Sections } from './identifiers.js';

const getElementById = (id: string) => {
	const element = document.getElementById(id);
	assertInstanceOf(element, HTMLElement);

	return element;
};

// const getElementsById2Dict = <T extends Object>(all: T, id: string) => {
// 	const element = getElementById(id);
// 	return Object.assign(all, { [id]: element });
// };

const [
	container,
	content,
	linesWrap,
	minimapWrap,
	minimapIndicator,
	navContainer,
	navItems,
	navLinks,
] = ids.elements.map((id) => getElementById(id));

const main = document.querySelector('main');
assertInstanceOf(main, HTMLElement);

const minimap = document.createElement('canvas');
minimapWrap.append(minimap);

const sections = ids.sections.reduce(
	(all: Sections, id: string) => {
		const element = getElementById(id);
		return Object.assign(all, { [id]: element });
	},
	<Sections>{}
);

export default <const>{
	container,
	main,
	content,
	sections,
	linesWrap,
	minimapWrap,
	minimapIndicator,
	minimap,
	navContainer,
	navItems,
	navLinks,
};
