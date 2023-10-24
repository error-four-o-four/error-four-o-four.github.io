const elements = [
	'main__container',
	'main__content',
	'main__lines',
	'main__minimap',
	'minimap__indicator',
	'nav__container',
	'nav__items',
	'nav__links',
] as const;

const sections = ['home', 'projects', 'skills'] as const;

export default {
	elements,
	sections,
};

const reducer = <T extends object>(all: T, id: keyof T) =>
	Object.assign(all, { [id]: id });

export const elementIds = elements.reduce(
	reducer,
	{} as Identifier<(typeof elements)[number]>
);

export const sectionIds = sections.reduce(
	reducer,
	{} as Identifier<(typeof sections)[number]>
	// <SectionIds>{}
);

// type SectionKeys = (typeof sections)[number];

// type SectionIds = {
// 	[K in SectionKeys]: (typeof sections)[number] extends SectionKeys[number]
// 		? K
// 		: never;
// };

type Identifier<T extends string[number]> = {
	[K in T]: T extends T[number] ? K[number] : never;
};

export type Sections = {
	[K in (typeof sections)[number]]: HTMLElement;
};
