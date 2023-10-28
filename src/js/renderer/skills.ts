import { assertInstanceOf } from '@/utils.js';

import { type Link, type Certificate } from '@data/types.js';
import technnologies from '@data/technologies.js';
import certificates from '@data/certificates.js';

import elements from '../elements.js';

import { createSectionHTMLBefore, createSectionHTMLAfter } from './utils.js';

const createSkillTemplateHTML = (data: string) => `
<div class="indent">
	<span class="clr-cyan">${data}</span>&colon;
	<span class="clr-magenta">&lsqb;</span>
	<div class="indent clr-green"></div>
	<span class="clr-magenta">&rsqb;</span>&comma;
	<br />
</div>`;

const createTechnologyHTML = (data: Link) => `
<span>&apos;</span><a
	target="_blank"
	href="${data.url}"
	rel="noopener nofollow"
	><span>${data.text}</span></a
><span>&apos;</span>`;

const createTechnologies = (
	template: HTMLTemplateElement,
	data: Readonly<Link[]>
) => {
	template.innerHTML = createSkillTemplateHTML('technologies');

	const content = template.content.firstElementChild?.children[2];
	assertInstanceOf(content, HTMLDivElement);

	for (let i = 0, ii = data.length - 1; i <= ii; i += 1) {
		content.innerHTML += createTechnologyHTML(data[i]);

		if (i < ii) {
			content.innerHTML += `<span class="clr-default">&comma;</span>\n`;
		}

		if (i > 0 && i % 4 === 0) {
			content.innerHTML += `<br />\n`;
		}

		if (i === 0 || (i % 4 !== 0 && i < ii)) {
			content.innerHTML += `<br class="display-lt560" />\n`;
		}
	}
};

const createCertificateHTML = (data: Certificate) => {
	const inner = data.titleSmall
		? `<span class="display-lt480">${data.titleSmall}</span><span class="display-gt480">${data.text}</span>`
		: `<span>${data.text}</span>`;

	return `
		<span>&apos;</span><a
			target="_blank"
			href="${data.url}"
			rel="noopener nofollow"
			>${inner}</a
		><span>&apos;</span>`;
};

const createCertificates = (
	template: HTMLTemplateElement,
	data: Readonly<Certificate[]>
) => {
	template.innerHTML = createSkillTemplateHTML('certificates');

	const content = template.content.firstElementChild?.children[2];
	assertInstanceOf(content, HTMLDivElement);

	for (let i = 0, ii = data.length - 1; i <= ii; i += 1) {
		content.innerHTML += createCertificateHTML(data[i]);

		if (i < ii) {
			content.innerHTML += `<span class="clr-default">&comma;</span>\n<br />\n`;
		}
	}
};

const createFinalHTML = () => `
<span class="clr-yellow">const</span>
<span>developer</span>
<span class="clr-orange">&equals;</span>
<span class="clr-orange">new</span>
<span class="clr-yellow">Developer&lpar;</span>
<div class="indent">
	<span>properties&comma;</span>
	<br />
	<span>projects&comma;</span>
	<br />
	<span>skills</span>
</div>
<span class="clr-yellow">&rpar;</span><span>&semi;</span>
<br />
<br />
<br />

<span>developer.</span><span class="clr-yellow">doStuff&lpar;&rpar;</span
><span>&semi;</span>
<br />
<br />
<br />

<p class="comment">&copy; ${new Date().getFullYear()}</p>`;

export const injectSkills = () => {
	const fragment = new DocumentFragment();

	const template = document.createElement('template');
	template.innerHTML = createSectionHTMLBefore('skills');
	fragment.append(template.content.cloneNode(true));

	createTechnologies(template, technnologies);
	fragment.append(template.content.cloneNode(true));

	createCertificates(template, certificates);
	fragment.append(template.content.cloneNode(true));

	template.innerHTML = createSectionHTMLAfter();
	fragment.append(template.content.cloneNode(true));

	template.innerHTML = createFinalHTML();
	fragment.append(template.content.cloneNode(true));

	elements.sections.skills.append(fragment);
};
