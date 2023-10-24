import { viewport } from '../viewport/viewport.js';

import { canvas, wrapper, indicator } from './minimap.js';
import { renderMinimap, resizeMinimap } from './utils.js';

import elements from '../elements.js';

export const updateMinimap = () => {
	resizeMinimap();
	renderMinimap(elements.content.children);

	updateMinimapIndicator();
};

export const updateMinimapIndicator = () => {
	const wrapperHeight = wrapper.offsetHeight;
	const canvasHeight = canvas.offsetHeight;

	const scroll = elements.container.scrollTop / viewport.contentHeight;

	if (canvasHeight <= wrapperHeight) {
		const height = scroll * canvasHeight;
		indicator.style.top = `${height}px`;
		canvas.style.removeProperty('top');
	} else {
		const height = scroll * wrapperHeight;
		indicator.style.top = `${height}px`;

		const delta = scroll * (wrapperHeight - canvasHeight);
		canvas.style.top = `${delta}px`;
	}
};

const updateScrollTop = (y: number) => {
	const scrollTarget =
		canvas.offsetHeight <= wrapper.offsetHeight
			? y
			: y - parseFloat(canvas.style.top);

	elements.container.scrollTop =
		(scrollTarget / canvas.offsetHeight) * elements.container.scrollHeight -
		0.5 * viewport.windowHeight;
};

export const updateMinimapOnMousewheel = (e: WheelEvent) => {
	// @todo doublecheck
	// elements.container.style.setProperty('scroll-behavior', 'auto');
	elements.container.scrollTop += e.deltaY;
	updateMinimapIndicator();
	// elements.container.style.setProperty('scroll-behavior', 'smooth');
};

let locked = false;

export const updateMinimapOnMousedown = (e: MouseEvent) => {
	// elements.container.style.setProperty('scroll-behavior', 'auto');

	updateScrollTop(e.clientY);
	updateMinimapIndicator();

	if (e.target === wrapper) return;

	locked = true;
};

export const updateMinimapOnMousemove = (e: MouseEvent) => {
	if (!locked) return;

	updateScrollTop(e.clientY);
	updateMinimapIndicator();
};

export const updateMinimapOnMouseup = () => {
	if (!locked) return;

	// @todo prefers reduced motion
	// elements.container.style.setProperty('scroll-behavior', 'smooth');

	locked = false;
};
