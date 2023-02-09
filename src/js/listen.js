import * as utils from './utils.js';
import elements from './elements.js';
import { injectSvgIconElement } from './create.js';

elements.sections.projects.classList.add('hidden');
elements.sections.about.classList.add('hidden');

for (const projectElement of elements.projects) {
	const imgElement = projectElement.querySelector('img');
	imgElement.classList.add('hidden');
}

export function createListeners() {
	createNavbarClickListener();

	createSectionObserver();
	createLazyloadObserver();
}

let activeNavbarLink = null;

function updateNavbarLink() {
	if (this.id === 'profile-link') return;

	activeNavbarLink?.classList.remove('active');
	activeNavbarLink = this;
	activeNavbarLink.classList.add('active');
}

function createNavbarClickListener() {
	for (const link of elements.links.navbar) {
		link.onclick = updateNavbarLink.bind(link);
	}
}

function createSectionObserver() {
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

function createLazyloadObserver() {
	const lazyloadProjectImage = (elt) => {
		const img = elt.querySelector('img');

		if (img === null) return;

		const src = img.getAttribute('data-src');

		img.onload = () => {
			img.onload = null;
			img.classList.remove('hidden');
		};

		img.src = src;
	};

	const lazyloadSvgs = async () => {
		const svgs = await utils.getJsonData('./src/data/svgs.json');
		const links = [...document.querySelectorAll('.lazy-svg-icon')];
		for (const link of links) injectSvgIconElement(link, svgs);
	};

	const callback = (entries, observer) => {
		for (const entry of entries) {
			const { target, isIntersecting } = entry;

			if (!isIntersecting) continue;

			if (target.classList.contains('project-card')) {
				lazyloadProjectImage(target);
				observer.unobserve(target);
				continue;
			}

			if (target.id === 'section-about') {
				lazyloadSvgs();
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