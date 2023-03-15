import elements from './elements.js';

const { welcome } = elements.sections;
const { pfp, pfpBg, txt } = elements;

// txt

const strings = ['<code/>', '() => code;', 'SELECT * FROM code;'];

const stringDelay = 100;
let displayCursor = false;
let index = 0;

export async function playTxtAnimation() {
	await delay(5000);
	eraseString();
}

function showCursor() {
	setInterval(() => {
		txt.classList.toggle('cursor');
	}, 700);
}

async function eraseString() {
	if (!displayCursor) {
		showCursor();
		displayCursor = true;
	}
	await delay(3000);
	let id = setInterval(() => {
		txt.textContent = txt.textContent.slice(0, -1);
		if (txt.textContent.length === 0) {
			clearInterval(id);
			id = null;
			index = (index + 1) % strings.length;
			writeString();
		}
	}, stringDelay);
}

async function writeString() {
	await delay(1000);
	const s = strings[index];
	let i = 0;
	let id = setInterval(async() => {
		txt.textContent = s.slice(0, i);
		i += 1;
		if (i > s.length) {
			clearInterval(id);
			id = null;
			eraseString();
		}
	}, stringDelay)
}

// Background

const bgKeyframes = [{ opacity: 0 }, { opacity: 1 }];
const bgOptions = {
	duration: 200,
	easing: 'ease-out',
};

// Profile

const transform = [
	'translateY(0%) scale(1)',
	'translateY(-5%) scale(0.875, 1.1)',
	'translateY(0%) scale(1)',
	'translateY(-5%) scale(0.875, 1.1)',
	'translateY(0%) scale(1)',
];

const filter = [
	'brightness(0.25) drop-shadow(0 -0.25rem 0.5rem black) blur(2px)',
	'brightness(1.0) drop-shadow(0 0.5rem 0.75rem black) blur(0)',
];

const pfpIntroKeyframes = [
	{
		marginBottom: '15%',
		transform: transform[0],
		filter: filter[0],
		opacity: 0,
		offset: 0,
	},
	{
		transform: transform[0],
		offset: 0.2,
	},
	{
		filter: filter[0],
		transform: transform[1],
		opacity: 0.25,
		offset: 0.4,
	},
	{
		filter: filter[1],
		transform: transform[2],
		opacity: 1,
		offset: 0.6,
	},
	{
		transform: transform[3],
		offset: 0.8,
	},
	{
		transform: transform[4],
		marginBottom: '7.5%',
		filter: filter[1],
		offset: 1,
	},
];

const pfpIntroOptions = {
	duration: 2000,
	easing: 'ease-in-out',
};

const pfpKeyframes = [
	{
		transform: 'scale(1)',
		marginBottom: '7.5%',
		offset: 0,
	},
	{
		transform: 'scale(0.975, 1.025)',
		marginBottom: '7.5%',
		offset: 0.325,
	},
	{
		transform: 'scale(1)',
		marginBottom: '7.5%',
		offset: 1,
	},
];

const pfpOptions = {
	duration: 4000,
	easing: 'ease-in-out',
	iterations: Infinity,
};

const animationDelay = 1000;

export async function playPfpAnimation() {
	await delay();
	welcome.classList.remove('loading');

	pfp.style.transformOrigin = 'bottom center';
	animateTo(pfpBg, bgKeyframes, bgOptions);
	const intro = animateTo(pfp, pfpIntroKeyframes, pfpIntroOptions);
	intro.onfinish = () => {
		animateTo(pfp, pfpKeyframes, pfpOptions);
	};
}

function animateTo(elt, keyframes, options) {
	const animation = elt.animate(keyframes, {
		...options,
		fill: 'forwards',
	});
	animation.addEventListener('finish', () => {
		animation.commitStyles();
		animation.cancel();
	});
	return animation;
}

function delay(ms = 1000) {
	return new Promise((res) => {
		setTimeout(res, ms);
	});
}
