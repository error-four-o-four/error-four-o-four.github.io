import elements from './elements.js';
import { getSvgAttributes, promisedSvgs } from './loaders.js';

let activeNavbarLink = null;

export function updateNavbarLink() {
	if (this.id === 'profile-link') return;

	activeNavbarLink?.classList.remove('active');
	activeNavbarLink = this;
	activeNavbarLink.classList.add('active');
}

export function createNavbarListener() {
	for (const link of elements.links.navbar.slice(0, -1)) {
		link.onclick = updateNavbarLink.bind(link);
	}

	// inject github svg
	const link = elements.links.navbar.at(-1);
	const { slug } = getSvgAttributes(link);

	link.classList.remove('lazy-svg');
	promisedSvgs.then((data) => {
		link.children[1].remove();
		link.children[0].innerHTML = data[slug];
	})
}