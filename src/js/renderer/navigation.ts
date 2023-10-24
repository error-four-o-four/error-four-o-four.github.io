import links, { type Link } from '../../data/links.js';
import icons from '../../data/icons.js';

import elements from '../elements.js';

import { sectionIds } from '../identifiers.js';

const createAvatar = () => {
	const wrap = document.createElement('div');
	wrap.innerHTML = icons.avatar;
	return wrap;
};

// ##################

const createNavItem = (data: NavItemData) => {
	const link = document.createElement('a');
	link.href = `#${data.hash}`;
	link.innerHTML = `<span inert="true" class="sr-only">External link to ${data.hash} section</span>${data.svg}`;

	return link;
};

const navItemsData: Readonly<NavItemData[]> = [
	{ hash: sectionIds.home, svg: icons.home },
	{
		hash: sectionIds.projects,
		svg: icons.folders,
	},
	{
		hash: sectionIds.skills,
		svg: icons.blocks,
	},
];

type NavItemData = {
	hash: string;
	svg: string;
};

// ##################

const createNavLink = (data: Link) => {
	const link = document.createElement('a');
	const icon = icons[data.text.toLocaleLowerCase() as keyof typeof icons];
	link.href = data.url;
	link.rel = 'noopener nofollow';
	link.target = '_blank';
	link.innerHTML = `<span inert="true" class="sr-only">External link to ${data.text}</span>${icon}`;

	return link;
};

const navLinksData = [links[0], links[3], links[1]];

// ##################

export const injectNavigation = () => {
	const navItemsFragment = new DocumentFragment();
	navItemsFragment.append(createAvatar());
	navItemsFragment.append(...navItemsData.map((data) => createNavItem(data)));
	elements.navItems.append(navItemsFragment);

	const navLinksFragment = new DocumentFragment();
	navLinksFragment.append(...navLinksData.map((data) => createNavLink(data)));
	elements.navLinks.append(navLinksFragment);
};
