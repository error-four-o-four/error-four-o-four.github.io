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

// const thumbTestOne: Thumbnail = {
// 	src: 'test1.png',
// 	width: 480,
// 	height: 371,
// 	alt: 'A picture of a test pattern',
// };

// const thumbTestTwo: Thumbnail = {
// 	src: 'test2.png',
// 	width: 480,
// 	height: 300,
// 	alt: 'A picture of a test pattern',
// };

const projects: Array<Readonly<Project>> = [
	// {
	// 	title: '',
	// 	descr: '',
	// 	thumb: {
	// 		src: '',
	// 		width: 0,
	// 		height: 0,
	// 		alt: 'a screenshot of the app'
	// 	},
	// 	links: {
	// 		repo: ''
	// 	},
	// 	tags: [

	// 	],
	// },
	{
		title: 'Kummerbot',
		descr:
			'An interactive (pseudo) Chat Bot App, written to simplify consult and complaint management in an enterprise.',
		thumb: {
			src: 'kummerbot.jpg',
			width: 480,
			height: 307,
			alt: 'a screenshot of the app',
		},
		links: {
			repo: 'https://github.com/error-four-o-four/kummerbot',
			demo: 'https://kummerbot.pro-liberis.de/chat',
		},
		tags: ['Frontend', 'Vanilla'],
	},
	{
		title: 'javascript‑software‑synthesizer',
		// @hack!
		descr: `Open Source Contribution and Collaboration.
		The JSS-01 | JavaScript Software Synthesizer -&nbsp;made by<span>&ensp;</span><a href="https://michaelkolesidis.com/" >Michael Kolesidis</a><span>&nbsp;</span>- is a web application enabling you to make and play music in the browser.`,
		thumb: {
			src: 'jss-light.jpg',
			width: 480,
			height: 270,
			alt: 'a screenshot of the app',
		},
		links: {
			repo: 'https://github.com/michaelkolesidis/javascript-software-synthesizer',
			demo: 'https://javascript-software-synthesizer.vercel.app/',
		},
		tags: ['Frontend', 'Vanilla', 'Tone.js', 'Web Audio API'],
	},
	{
		title: 'freeCodeCamp calculator',
		descr:
			'One of Five projects, to earn the Front End Development Libraries certification.',
		thumb: {
			src: 'fcc-calc.jpg',
			width: 480,
			height: 384,
			alt: 'a screenshot of the app',
		},
		links: {
			repo: 'https://github.com/error-four-o-four/fcc-calc',
			demo: 'https://error-four-o-four.github.io/projects/fcc-calculator/',
		},
		tags: ['Frontend', 'React'],
	},
	{
		title: 'freeCodeCamp pomodoro app',
		descr:
			'One of Five projects, to earn the Front End Development Libraries certification.',
		thumb: {
			src: 'fcc-timer.jpg',
			width: 480,
			height: 270,
			alt: 'a screenshot of the app',
		},
		links: {
			repo: 'https://github.com/error-four-o-four/fcc-twenty-five-five',
			demo: 'https://error-four-o-four.github.io/projects/fcc-twenty-five-five-clock/',
		},
		tags: ['Frontend', 'React'],
	},
	// {
	// 	title: 'Frequently Used Utilities',
	// 	descr: 'A TS library of frequently used utility functions. ',
	// 	thumb: thumbTestOne,
	// 	links: {
	// 		repo: 'https://github.com/error-four-o-four/utils-fuu',
	// 	},
	// },
	// {
	// 	title: 'DOM Utilities',
	// 	descr: 'A small TS library to manipulate the DOM.',
	// 	thumb: thumbTestOne,
	// 	links: {
	// 		repo: 'https://github.com/error-four-o-four/utils-dom',
	// 	},
	// },
	// {
	// 	title: 'freeCodeCamp Projects',
	// 	descr:
	// 		'5 projects which were built to obtain the freeCodeCamp Front End Development Libraries certification',
	// 	thumb: thumbTestTwo,
	// 	links: {
	// 		repo: 'https://github.com/error-four-o-four/projects',
	// 		demo: 'https://error-four-o-four.github.io/projects/',
	// 	},
	// },
	// {
	// 	title: 'Dummy',
	// 	descr:
	// 		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quo amet minima similique voluptatem consectetur saepe impedit?',
	// 	thumb: thumbTestOne,
	// 	links: {
	// 		repo: '#',
	// 		demo: '#',
	// 	},
	// 	tags: ['some', 'dummy', 'tags'],
	// },
	// {
	// 	title: 'Dummy',
	// 	descr:
	// 		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quo amet minima similique voluptatem consectetur saepe impedit?',
	// 	thumb: thumbTestTwo,
	// 	links: {
	// 		repo: '#',
	// 		demo: '#',
	// 	},
	// 	tags: ['more', 'dummy', 'tags'],
	// },
];

export default projects;
