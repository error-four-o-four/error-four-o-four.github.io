import { elementIds, sectionIds } from '../../../src/js/identifiers.js';

import home from './home.js';

const script = 'src/main.ts';

const animatedLoadingClass = 'animated-loading';

export default `
<body class="${animatedLoadingClass}">
	<div id="${elementIds.main__container}">
		<main>
			<div id="${elementIds.main__lines}" class="main__aside" role="none"></div>
			<div id="${elementIds.main__content}">
				<section id="${sectionIds.home}">
				${home}
				</section>
				<section id="${sectionIds.projects}"></section>
				<section id="${sectionIds.skills}"></section>
			</div>
			<div id="${elementIds.main__minimap}" class="main__aside">
				<div id="${elementIds.minimap__indicator}"></div>
			</div>
		</main>
	</div>

	<div id="${elementIds.nav__container}" class="${animatedLoadingClass}">
		<nav>
			<div id="${elementIds.nav__items}"></div>
			<div id="${elementIds.nav__links}"></div>
		</nav>
	</div>
	<script src="${script}" type="module"></script>
</body>`;
