import { assertInstanceOf } from '../utils.js';

import { injectNavigation } from './renderer/navigation.js';
import { injectProjects } from './renderer/projects.js';
import { injectSkills } from './renderer/skills.js';

import { updateContents } from './viewport/handlers.js';
import { updateSectionIndicator } from './navigation/handlers.js';

import { attachHandlers } from './handlers.js';

import elements from './elements.js';

const updateImages = () => {
	const thumbs = document.querySelectorAll('.project__thumb');

	for (const thumb of thumbs) {
		const img = thumb.firstElementChild;
		assertInstanceOf(img, HTMLImageElement);

		const onload = () => {
			thumb.classList.add('loaded');
			img.onload = null;
		};

		if (img.complete) {
			onload();
		} else {
			img.onload = onload;
		}
	}
};

const removeLoadingAnmiation = (element: HTMLElement) =>
	element.style.setProperty('animation', 'none');

export default () => {
	injectNavigation();
	injectProjects();
	injectSkills();

	updateImages();
	updateContents();
	updateSectionIndicator();

	attachHandlers();

	removeLoadingAnmiation(elements.minimapWrap);
	removeLoadingAnmiation(elements.navContainer);
};
