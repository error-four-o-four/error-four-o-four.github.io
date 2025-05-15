import { assertInstanceOf } from '../../utils.js';

import { viewport } from '../viewport/viewport.js';

import elements from '../elements.js';

const getAnchorElementRecursive = (element: Element): Element | null =>
	element.localName === 'a'
		? element
		: element.parentElement
		? getAnchorElementRecursive(element.parentElement)
		: null;

const findActiveItem = (id: string) =>
	[...elements.navItems.getElementsByTagName('a')].find(
		(item) => item.href.split('#')[1] === id
	) || null;

const selector = 'nav__item-active';

const getActiveItem = () => elements.navItems.querySelector('.' + selector);

let identifier: string | null = null;

export const updateSectionIndicator = () => {
	const prevIdentifier = identifier;

	const scrollOffset = 0.5 * viewport.windowHeight;
	const { scrollTop } = elements.container;

	for (const element of Object.values(elements.sections)) {
		const y1 = element.offsetTop - scrollTop;
		const y2 = y1 + element.scrollHeight;

		if (y1 > scrollOffset) continue;

		if (y2 <= scrollOffset) continue;

		identifier = element.id;
		break;
	}

	if (!identifier || prevIdentifier === identifier) return;

	let activeItem = getActiveItem();
	activeItem?.classList.remove(selector);

	activeItem = findActiveItem(identifier);
	activeItem?.classList.add(selector);
};

export const updateOnNavItemClick = (e: MouseEvent) => {
	e.preventDefault();

	assertInstanceOf(e.target, Element);
	const anchor = getAnchorElementRecursive(e.target);

	assertInstanceOf(anchor, HTMLAnchorElement);

	const hash = anchor.hash.substring(1);
	const section = elements.sections[hash as keyof typeof elements.sections];

	if (!section) return;

	section.scrollIntoView({ behavior: 'smooth' });
};
