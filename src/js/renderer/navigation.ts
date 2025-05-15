import links from '@data/links.js';
import icons from '@data/icons.js';

import { type Link } from '@data/types.js';

import elements from '../elements.js';

import { sectionIds } from '../identifiers.js';

const prependAvatar = () => {
	const wrap = document.createElement('div');
	wrap.innerHTML = icons.avatar;

	elements.navContainer.children[0].prepend(wrap);
};

// ##################

const createNavItem = (data: NavItemData) => {
	const link = document.createElement('a');
	link.href = `#${data.hash}`;
	link.innerHTML = `<span inert="true" class="sr-only">Internal link to ${data.hash} section</span>${data.svg}`;

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

// ##################

export const injectNavigation = () => {
	prependAvatar();

	const navItemsFragment = new DocumentFragment();
	navItemsFragment.append(...navItemsData.map((data) => createNavItem(data)));
	elements.navItems.append(navItemsFragment);

	const navLinksFragment = new DocumentFragment();
	navLinksFragment.append(...links.map((data) => createNavLink(data)));
	elements.navLinks.append(navLinksFragment);
};
