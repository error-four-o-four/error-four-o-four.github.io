import elements from '../elements.js';

import { updateMinimap } from '../minimap/handlers.js';

import { viewport } from './viewport.js';
import { getWindowWidth, getWindowHeight } from './utils.js';

const updateMinimumSectionHeight = () => {
	const lineHeight = viewport.lineHeight;

	for (const section of Object.values(elements.sections)) {
		if (section.style.minHeight) section.style.removeProperty('min-height');

		const sectionHeight =
			Math.ceil(section.offsetHeight / lineHeight) * lineHeight;

		section.style.setProperty('min-height', sectionHeight + 'px');
	}
};

const createEditorLinesElement = () => {
	const element = document.createElement('div');
	element.classList.add('main__line');
	elements.linesWrap.append(element);
};

const updateEditorLines = () => {
	const elementHeight = 10 * viewport.lineHeight;
	const requiredHeight = viewport.contentHeight - elementHeight;
	const availableHeight = elements.linesWrap.childElementCount * elementHeight;

	if (availableHeight < requiredHeight) {
		// console.log('adding lines', availableHeight, requiredHeight);
		let top = availableHeight;
		while (top < requiredHeight) {
			createEditorLinesElement();
			top += elementHeight;
		}
	}

	if (elements.linesWrap.offsetHeight >= viewport.contentHeight) {
		elements.linesWrap.style.setProperty(
			'max-height',
			`${viewport.contentHeight}px`
		);
	} else {
		elements.linesWrap.removeAttribute('style');
	}
};

export const updateContents = () => {
	const windowWidth = getWindowWidth();
	const windowHeight = getWindowHeight();

	if (viewport.skipUpdate(windowWidth, windowHeight)) {
		// console.log('skipped update');
		return;
	}

	if (!viewport.windowWidth || viewport.triggeredMediaQuery(windowWidth)) {
		// console.log('media query');
		viewport.onFontSizeHasChanged();
	}

	viewport.windowWidth = windowWidth;
	viewport.windowHeight = windowHeight;

	updateMinimumSectionHeight();

	viewport.contentWidth = elements.content.offsetWidth;
	viewport.contentHeight = elements.content.offsetHeight;

	const minimapIsVisible =
		getComputedStyle(elements.minimapWrap).display !== 'none';

	if (!minimapIsVisible) return;

	updateEditorLines();
	updateMinimap();
};
