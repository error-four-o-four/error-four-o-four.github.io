import { getJsonData } from '../js/utils';

const icons = await getJsonData('./src/data/icons.json');
const reduceIcons = (all, slug) => ({ ...all, [slug]: icons[slug] });

export const links = {
	languages: ['html5', 'css3', 'postcss', 'javascript', 'typescript'].reduce(reduceIcons, {}),
	frameworks: ['nodedotjs', 'vitest', 'vite', 'rollupdotjs'].reduce(reduceIcons, {}),
	socials: ['openprocessing', 'github', 'npm'].reduce(reduceIcons, {})
}

export const certificates = [
	{
		title: 'Responsive Web Design',
		url: 'https://www.freecodecamp.org/certification/httpfourofour/responsive-web-design',
	},
	{
		title: 'JavaScript Algorithms and Data Structures',
		url: 'https://freecodecamp.org/certification/httpfourofour/javascript-algorithms-and-data-structures',
	},
	{
		title: 'Front End Development Libraries',
		url: 'https://www.freecodecamp.org/certification/httpfourofour/front-end-development-libraries',
	},
];
