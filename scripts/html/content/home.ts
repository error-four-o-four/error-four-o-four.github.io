import { type Link } from '../../../data/types.js';
import links from '../../../data/links.js';

const props = {
	first: 'Jens',
	last: 'Bachmayer',
	alias: 'error‑four‑o‑four',
};

const age = Math.floor(
	(new Date().getTime() - new Date('1985-12-22').getTime()) / 3.15576e10
);

const createProp = (key: string, val: string) => `
<span class="clr-cyan">${key}</span><span>&colon;</span>
<span class="clr-green">&apos;${val}&apos;</span><span>&comma;</span>`;

const createLink = (link: Link) => `
<span>&apos;</span><a
	target="_blank"
	href="${link.url}"
	alt="Link to ${link.text} profile"
	rel="noopener nofollow"
	><span>${link.text}</span></a
><span>&apos;</span>`;

export default `
<span class="clr-yellow">const</span> <span>properties</span>
<span class="clr-orange">&equals;</span>
<span class="clr-yellow">&lcub;</span>

<div class="indent">
	${Object.entries(props)
		.map(([key, val]) => createProp(key, val))
		.join('\n<br />\n')}
	<br />

	<span class="clr-cyan">age</span><span>&colon;</span>
	<span class="clr-red">${age}</span><span>&comma;</span>
	<br />

	<span class="clr-cyan">links</span><span>&colon;</span>
	<span class="clr-magenta">&lbrack;</span>

	<div class="indent clr-green">
		${links
			.map((link) => createLink(link))
			.join(`<span class="clr-default">&comma;</span><br />\n`)}
	</div>

	<span class="clr-magenta">&rbrack;</span><span>&comma;</span>
</div>

<span class="clr-yellow">&rcub;</span><span>&semi;</span>
<br />
<br />
<br />

<p class="comment">
	Hey there!<br />
	I&apos;m a self-taught Web Development Enthusiast.
</p>
<br />
<p class="comment">
	I like to code things from scratch and&nbsp;<br class="display-gt560" />
	care about performance and responsive designs.
</p>
`;
