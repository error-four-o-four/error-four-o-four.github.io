import { updateContents } from './viewport/handlers.js';

import {
	updateSectionIndicator,
	updateOnNavItemClick,
} from './navigation/handlers.js';

import {
	updateMinimapIndicator,
	updateMinimapOnMousedown,
	updateMinimapOnMousemove,
	updateMinimapOnMouseup,
	updateMinimapOnMousewheel,
} from './minimap/handlers.js';

import elements from './elements.js';

const onscroll = () => {
	updateMinimapIndicator();
	updateSectionIndicator();
};

export const attachHandlers = () => {
	elements.container.addEventListener('scroll', () => {
		requestAnimationFrame(onscroll);
	});

	elements.minimapWrap.addEventListener('wheel', (e) => {
		requestAnimationFrame(updateMinimapOnMousewheel.bind(null, e));
	});

	elements.minimapWrap.addEventListener('mousedown', (e) => {
		requestAnimationFrame(updateMinimapOnMousedown.bind(null, e));
	});

	elements.minimapWrap.addEventListener('mousemove', (e) => {
		requestAnimationFrame(updateMinimapOnMousemove.bind(null, e));
	});

	elements.minimapWrap.addEventListener('mouseup', () => {
		requestAnimationFrame(updateMinimapOnMouseup);
	});

	elements.navItems.addEventListener('click', updateOnNavItemClick);

	window.addEventListener('resize', () => {
		requestAnimationFrame(updateContents);
	});
};
