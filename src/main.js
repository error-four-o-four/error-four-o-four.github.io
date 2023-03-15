import './style.css';

import elements from './js/elements.js';

import { playTxtAnimation, playPfpAnimation } from './js/animation.js';
import { createNavbarListener } from './js/navigation.js';
import { createSectionObserver } from './js/observers.js';
import { injectSvgs, lazyLoadAllImages, promisedAnimationImages, promisedSvgs } from './js/loaders.js';

// hide by default
elements.sections.welcome.classList.add('loading');
elements.sections.projects.classList.add('hidden');
elements.sections.about.classList.add('hidden');

for (const cardElement of elements.cards) {
	const imgElement = cardElement.querySelector('img');
	imgElement?.classList.add('hidden');
}

createNavbarListener();
createSectionObserver();

window.addEventListener('load', () => {
	promisedAnimationImages.then(playPfpAnimation);
	promisedSvgs.then(injectSvgs);

	lazyLoadAllImages();
	playTxtAnimation();
});
