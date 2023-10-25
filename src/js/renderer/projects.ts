import { assertInstanceOf } from '../../utils.js';

import projects, {
	type Project,
	type Thumbnail,
	type Links,
} from '../../data/projects.js';

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

const appendThumbnail = (parent: HTMLDivElement, data: Thumbnail) => {
	const wrap = document.createElement('div');
	wrap.classList.add('project__thumb');
	wrap.style.aspectRatio = `${data.width / data.height}`;

	const url = `url(assets/${data.src.split('.')[0] + '-small.webp'})`;
	wrap.style.backgroundImage = url;

	const img = document.createElement('img');
	img.loading = 'lazy';
	img.alt = data.alt || '';
	img.src = `assets/${data.src}`;

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

const appendLinks = (parent: HTMLDivElement, data: Links) => {
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
	data.thumb && appendThumbnail(content, data.thumb);

	appendDescription(content, data.descr);
	appendLinks(content, data.links);

	data.tags && appendTags(content, data.tags);
};

export const injectProjects = () => {
	const fragment = new DocumentFragment();

	const template = document.createElement('template');
	template.innerHTML = createSectionHTMLBefore('projects');
	fragment.append(template.content.cloneNode(true));

	for (const data of projects) {
		createProject(template, data);
		fragment.append(template.content.cloneNode(true));
	}

	template.innerHTML = createSectionHTMLAfter();
	fragment.append(template.content.cloneNode(true));

	elements.sections.projects.append(fragment);
};
