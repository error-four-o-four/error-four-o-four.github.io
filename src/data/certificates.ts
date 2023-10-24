import { type Link } from './links.js';

export type Certificate = Link & {
	titleSmall?: string;
};

const certificates: Readonly<Certificate[]> = [
	{
		text: 'Responsive Web Design',
		titleSmall: 'Responsive Design',
		url: 'https://www.freecodecamp.org/certification/httpfourofour/responsive-web-design',
	},
	{
		text: 'JavaScript Algorithms and Data Structures',
		titleSmall: 'JavaScript Algorithms',
		url: 'https://freecodecamp.org/certification/httpfourofour/javascript-algorithms-and-data-structures',
	},
	{
		text: 'Front End Development Libraries',
		titleSmall: 'Frontend',
		url: 'https://www.freecodecamp.org/certification/httpfourofour/front-end-development-libraries',
	},
	{
		text: 'Back End Development and APIs',
		titleSmall: 'Backend',
		url: 'https://www.freecodecamp.org/certification/httpfourofour/back-end-development-and-apis',
	},
	{
		text: 'Relational Database',
		titleSmall: 'Database',
		url: 'https://www.freecodecamp.org/certification/httpfourofour/relational-database-v8',
	},
];

export default certificates;
