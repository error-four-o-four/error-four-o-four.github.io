import { JSDOM } from 'jsdom';
import data from './data/index.js';

export const stringToFragment = (str) => {
	return JSDOM.fragment(str);
};

export function injectSvgLink(key) {
	const { title, slug, hex, url } = data.links.find(({ slug }) => slug === key);
	return `
		<li>
			<a
				class="lazy-svg"
				target="_blank"
				href="${url}"
				rel="noopener"
				alt="Link to ${title} homepage"
				data-slug="${slug}"
				data-hex="${hex}"
			>
				<span class="lazy-svg-placeholder"></span><span>${title}</span>
				</a>
		</li>`;
}
