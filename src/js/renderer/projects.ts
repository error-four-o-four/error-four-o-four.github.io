import { assertInstanceOf } from '@/utils.js';

import projects from '@data/projects.dict.js';

import {
	type Project,
	type ProjectImage,
	type ProjectLinks,
} from '@data/types.js';

import elements from '../elements.js';

import { createSectionHTMLAfter, createSectionHTMLBefore } from './utils.js';

const createProjectTemplateHTML = () => `
<article class="project indent">
	<span class="clr-magenta">&lcub;</span>
	<div class="indent"></div>
	<span class="clr-magenta">&rcub;</span>&comma;
</article>`;

const appendTitle = (parent: HTMLDivElement, title: string) => {
	parent.innerHTML += `
<span class="clr-cyan">title</span>&colon;
<span class="clr-green">&apos;${title.replaceAll(
		/\s+/g,
		'&nbsp;'
	)}&apos;</span>&comma;
<br />`;
};

const appendThumbnail = (
	parent: HTMLDivElement,
	image: ProjectImage,
	thumb: string
) => {
	const wrap = document.createElement('div');
	wrap.classList.add('project__thumb');
	wrap.style.aspectRatio = `${image.width / image.height}`;

	const base = import.meta.env.DEV ? './data/projects/' : './assets/';

	const url = `url(${base}${thumb})`;
	wrap.style.backgroundImage = url;

	const img = document.createElement('img');
	img.loading = 'lazy';
	img.src = base + image.src;

	wrap.append(img);
	parent.append(wrap);
};

const createProjectLink = (url: string, text: string) => {
	const link = document.createElement('a');
	link.href = url;
	link.rel = 'noopener nofollow';
	link.target = '_blank';
	link.innerHTML = text;
	return link;
};

const appendLinks = (parent: HTMLDivElement, data: ProjectLinks) => {
	parent.innerHTML += `
<span class="clr-cyan">links</span>&colon;
<span class="clr-blue">&lbrack;</span>
<div class="project__links indent clr-green"></div>
<span class="clr-blue">&rbrack;</span>&comma;`;

	const wrap = parent.querySelector('div.project__links');
	assertInstanceOf(wrap, HTMLDivElement);

	const repoLink = createProjectLink(data.repo, 'repository');
	wrap.append(repoLink);

	if (!data.demo) return;

	const demoLink = createProjectLink(data.demo, 'live');
	wrap.innerHTML += `<span class="clr-default">&comma;</span>\n<br />`;
	wrap.append(demoLink);
};

const appendTags = (parent: HTMLDivElement, data: string[]) => {
	parent.innerHTML += `
<br />
<span class="clr-cyan">tags</span>&colon;
<span class="clr-blue">&lbrack;</span>
<div class="project__tags indent clr-green">
	${data
		.map((tag) => `<span>&apos;${tag}&apos;</span>`)
		.join(`<span class="clr-default">&comma;</span>\n<br />\n`)}
</div>
<span class="clr-blue">&rbrack;</span>&comma;	`;
};

const appendDescription = (parent: HTMLDivElement, data: string) => {
	const element = document.createElement('p');
	element.classList.add('comment');
	element.innerHTML = data;

	parent.append(element);
};

const createProject = (template: HTMLTemplateElement, data: Project) => {
	template.innerHTML = createProjectTemplateHTML();

	const content = template.content.firstElementChild?.children[1];
	assertInstanceOf(content, HTMLDivElement);

	appendTitle(content, data.title);
	data.image && data.thumb && appendThumbnail(content, data.image, data.thumb);

	appendDescription(content, data.descr);
	appendLinks(content, data.links);

	data.tags && appendTags(content, data.tags);
};

export const injectProjects = () => {
	const fragment = new DocumentFragment();

	const template = document.createElement('template');
	template.innerHTML = createSectionHTMLBefore('projects');
	fragment.append(template.content.cloneNode(true));

	const ordered = [
		projects.kummerbot,
		projects.jss,
		projects.fccTimer,
		projects.fccCalculator,
		projects.fuus,
	];

	for (const data of ordered) {
		createProject(template, data);
		fragment.append(template.content.cloneNode(true));
	}

	template.innerHTML = createSectionHTMLAfter();
	fragment.append(template.content.cloneNode(true));

	elements.sections.projects.append(fragment);
};
