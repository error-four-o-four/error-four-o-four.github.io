import data from '../data/index.js';
import { injectSvgLink, stringToFragment } from '../utils.js';

const ulId = 'ul-socials';

const tmplFooter = `
<footer>
	<div class="container-480">
		<ul id="${ulId}"></ul>
		<p>&copy; 2023</p>
	</div>
</footer>`;

const createSocialLinks = () => data.about.socials.map(injectSvgLink).join('');

export default () => {
	const frag = stringToFragment(tmplFooter);
	const ul = frag.querySelector(`#${ulId}`);
	ul.innerHTML = createSocialLinks();

	return frag;
};
