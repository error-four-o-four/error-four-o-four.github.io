const imgPath = './public/assets/';

export const projects = [
	{
		title: 'Dummy',
		descr:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quo amet minima similique voluptatem consectetur saepe impedit?',
		thumb: {
			src: `${imgPath}test1.png`,
			srcset: null,
		},
		links: {
			repo: '#',
			demo: '#',
		},
	},
	{
		title: 'Dummy',
		descr:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quo amet minima similique voluptatem consectetur saepe impedit?',
		thumb: {
			src: `${imgPath}test3.png`,
			srcset: null,
		},
		links: {
			repo: '#',
			demo: '#',
		},
	},
	{
		title: 'Fancy Web Components',
		descr:
			'A set of reusable, custom web components.',
		thumb: {
			src: null,
			srcset: null,
		},
		links: {
			repo: 'https://github.com/error-four-o-four/native-web-component-selector',
			demo: null,
		},
	},
	{
		title: 'DOM Utilities',
		descr: 'A small typescript-library to manipulate the DOM.',
		thumb: {
			src: null,
			srcset: null,
		},
		links: {
			repo: 'https://github.com/error-four-o-four/utils-dom',
			demo: null,
		},
	},
];
