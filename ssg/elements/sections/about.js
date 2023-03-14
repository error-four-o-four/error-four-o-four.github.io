import data from '../../data/index.js';
import { injectSvgLink, stringToFragment } from '../../utils.js';

const tmplWrap = `<div class="div-flex"></div>`;

const tmplFirstArticle = `
<article class="flex-item-1">
	<p>I like to code things from scratch and care about performance and responsive designs.</p>
</article>`;

const createArticle = (title, id) => `
<article>
	<div>
	<h4>${title}</h4>
	<ul id="${id}"></ul>
	</div>
</article>`;

const createArticleItems = (key) => {
	return data.about[key].map(injectSvgLink).join('');
};

const createArticleFragment = (key) => {
	const title = key.at(0).toUpperCase() + key.substring(1);
	const ulId = `ul-${key}`;
	const frag = stringToFragment(createArticle(title, ulId));
	const ul = frag.querySelector(`#${ulId}`);
	ul.innerHTML = createArticleItems(key);

	return frag;
};

const certificatesUlId = 'ul-certificates';

const tmplCertificatesArticle = `
<article class="flex-item-1">
	<h4>freeCodeCamp Certifications:</h4>
	<ul id="${certificatesUlId}"></ul>
</article>`;

const createCertificate = ({ title, url }) => `
	<li>
		<a
			target="_blank"
			href="${url}"
			rel="noopener"
			alt="Link to certificate"
		>
			${title}
		</a>
	</li>`;

const createCertificatesFragment = () => {
	const frag = stringToFragment(tmplCertificatesArticle);
	const ul = frag.querySelector(`#${certificatesUlId}`);
	ul.innerHTML = data.about.certificates.map(createCertificate).join('');

	return frag;
};

export default () => {
	const wrap = stringToFragment(tmplWrap);
	wrap.firstElementChild.append(
		stringToFragment(tmplFirstArticle),
		createArticleFragment('languages'),
		createArticleFragment('environments'),
		createCertificatesFragment()
	);

	return wrap;
};
