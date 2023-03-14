import elements from './elements.js';
import { updateNavbarLink } from './navigation.js';

export function createSectionObserver() {
	const callback = (entries) => {
		for (const entry of entries) {
			const { target, isIntersecting } = entry;
			const { height } = entry.rootBounds;
			const { y: y1, bottom: y2 } = entry.boundingClientRect;

			if (!isIntersecting) continue;

			if (y1 < 0.75 * height && target.classList.contains('hidden')) {
				// fade section in
				target.classList.remove('hidden');
			}

			if (y1 < 0.5 * height && y2 > 0.5 * height) {
				const linkElement = elements.links.navbar.find((elt) => elt.href.split('#')[1] === target.id);
				// highlight active navbar link
				updateNavbarLink.call(linkElement);
			}
		}
	};

	const options = {
		threshold: [...Array(11).keys()].map((i) => i / 10),
	};
	const observer = new IntersectionObserver(callback, options);

	for (const section of Object.values(elements.sections)) observer.observe(section);
}

export function createLazyloadObserver() {
	const callback = (entries, observer) => {
		for (const entry of entries) {
			const { target, isIntersecting } = entry;

			if (!isIntersecting) continue;

			if (target.classList.contains('project-card')) {
				lazyloadProjectImage(target);
				observer.unobserve(target);
				continue;
			}
		}
	};

	const options = {
		rootMargin: `0px 0px ${0.5 * window.innerHeight}px 0px`,
	};

	const observer = new IntersectionObserver(callback, options);

	for (const project of elements.projects) observer.observe(project);
	observer.observe(elements.sections.about);
}
