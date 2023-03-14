import data from '../../data/index.js';
import { stringToFragment } from '../../utils.js';

const tmplWrap = `<div class="div-flex"></div>`;

const createCard = ({ title, descr, thumb, links }) => {
	const img =
		// @todo srcset
		thumb.src === null
			? ``
			: `<img
		data-src="assets/${thumb.src}"
		alt="Thumbnail ${title}"/>`;

	const anchors = Object.entries(links)
		.map(([type, url]) =>
			url === null
				? ``
				: `<a
		href="${url}"
		target="_blank"
		rel="noopener">${type}</a>`
		)
		.join('');

	const card = `
	<article class="project-card">
		<div class="project-thumb">
			${img}
			</div>
			<div class="project-content">
				<div class="project-descr">
				<h4>${title}</h4>
				<p>${descr}</p>
			</div>
			<div class="project-links">
				${anchors}
			</div>
		</div>
	</article>`;

	return card;
};

const createProjects = () => data.projects.map(createCard).join('');

export default () => {
	const frag = stringToFragment(tmplWrap);
	frag.firstElementChild.innerHTML = createProjects();

	return frag;
};
