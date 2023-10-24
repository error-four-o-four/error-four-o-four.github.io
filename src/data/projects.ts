export type Project = {
	title: string;
	descr: string;
	links: Links;
	thumb?: Thumbnail;
	tags?: string[];
};

export type Thumbnail = {
	src: string;
	width: number;
	height: number;
	alt?: string;
};

export type Links = {
	repo: string;
	demo?: string;
};

const thumbTestOne: Thumbnail = {
	src: 'test1.png',
	width: 480,
	height: 371,
	alt: 'A picture of a test pattern',
};

const thumbTestTwo: Thumbnail = {
	src: 'test2.png',
	width: 480,
	height: 300,
	alt: 'A picture of a test pattern',
};

const projects: Array<Readonly<Project>> = [
	{
		title: 'Frequently Used Utilities',
		descr: 'A TS library of frequently used utility functions. ',
		thumb: thumbTestOne,
		links: {
			repo: 'https://github.com/error-four-o-four/utils-fuu',
		},
	},
	{
		title: 'DOM Utilities',
		descr: 'A small TS library to manipulate the DOM.',
		thumb: thumbTestOne,
		links: {
			repo: 'https://github.com/error-four-o-four/utils-dom',
		},
	},
	{
		title: 'freeCodeCamp Projects',
		descr:
			'5 projects which were built to obtain the freeCodeCamp Front End Development Libraries certification',
		thumb: thumbTestTwo,
		links: {
			repo: 'https://github.com/error-four-o-four/projects',
			demo: 'https://error-four-o-four.github.io/projects/',
		},
	},
	{
		title: 'Dummy',
		descr:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quo amet minima similique voluptatem consectetur saepe impedit?',
		thumb: thumbTestOne,
		links: {
			repo: '#',
			demo: '#',
		},
		tags: ['some', 'dummy', 'tags'],
	},
	{
		title: 'Dummy',
		descr:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quo amet minima similique voluptatem consectetur saepe impedit?',
		thumb: thumbTestTwo,
		links: {
			repo: '#',
			demo: '#',
		},
		tags: ['more', 'dummy', 'tags'],
	},
];

export default projects;
