import elements from './elements.js';

import { projects } from '../data/projects.js';
import { links, certificates } from '../data/about.js';
import { titleCase } from './utils.js';

export function createElements() {
	createProjectCards();
	createAboutLinks();
	createAboutCertificates();
}

function createProjectCards() {
	const cardsWrap = elements.sections.projects.children[0];

	for (const { title, descr, thumb, links } of projects) {
		const cardElement = document.createElement('article');
		// prettier-ignore
		const imageElement = (thumb.src === null)
			? ``
			: `<img
				data-src="${thumb.src}"
				alt="Thumbnail ${title}"/>`;

		// prettier-ignore
		const linkElements = Object.entries(links).map(([type, url]) => (url === null)
			? ``
			: `<a
				href="${url}"
				target="_blank"
				rel="noopener">${titleCase(type)}</a>`
		).join('');

		cardElement.classList.add('project-card');
		cardElement.innerHTML = `
			<div class="project-thumb">
				${imageElement}
				</div>
				<div class="project-content">
					<div class="project-descr">
					<h4>${title}</h4>
					<p>${descr}</p>
				</div>
				<div class="project-links">
					${linkElements}
				</div>
			</div>
		`;

		cardsWrap.append(cardElement);
		elements.projects.push(cardElement);
	}
}

function createAboutLinks() {
	for (const category in links) {
		const listElement = elements.uls[category];

		for (const slug in links[category]) {
			const { title, url, hex } = links[category][slug];
			const itemElement = document.createElement('li');
			const linkElement = document.createElement('a');

			const attr = {
				target: '_blank',
				href: url,
				rel: 'noopener',
				alt: `Link to ${title} homepage`,
				['data-slug']: slug,
				['data-hex']: hex,
			};

			Object.entries(attr).map(([key, val]) => linkElement.setAttribute(key, val));

			linkElement.classList.add('lazy-svg-icon');
			linkElement.innerHTML = `<span class="inject-svg-icon"></span><span>${title}</span>`;
			// linkElement.innerHTML = `<span><img src="./public/icons/${slug}.svg" loading="lazy" alt="${slug} icon"/></span><span>${title}</span>`;

			itemElement.append(linkElement);
			listElement.append(itemElement);

			elements.links[category].push(linkElement);
		}
	}
}

function createAboutCertificates() {
	const listElement = elements.uls.certificates;

	for (const { title, url } of certificates) {
		const itemElement = document.createElement('li');
		const linkElement = document.createElement('a');

		const attr = {
			target: '_blank',
			href: url,
			rel: 'noopener',
			alt: `Link to certificate`,
		};
		Object.entries(attr).map(([key, val]) => linkElement.setAttribute(key, val));

		linkElement.innerHTML = title;

		itemElement.append(linkElement);
		listElement.append(itemElement);

		elements.links.certificates.push(linkElement);
	}
}

export async function injectSvgIconElement(elt, data) {
	const slug = elt.getAttribute('data-slug');
	const span = elt.querySelector('.inject-svg-icon');

	span.innerHTML = data[slug];
}
