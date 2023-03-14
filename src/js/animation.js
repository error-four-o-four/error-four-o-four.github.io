import elements from './elements.js';

const { welcome } = elements.sections;
const { pfp, pfpBg } = elements;

const animationDelay = 1000;

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
	'brightness(1.0) drop-shadow(0 0.5rem 0.5rem black) blur(0)',
];

const pfpKeyframes = [
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
const pfpOptions = {
	duration: 2000,
	easing: 'ease-in-out',
};

export async function playAnimation() {
	await new Promise((res) => setTimeout(() => res(), animationDelay));
	welcome.classList.remove('loading');

	pfp.style.transformOrigin = 'bottom center';
	animateTo(pfpBg, bgKeyframes, bgOptions);
	animateTo(pfp, pfpKeyframes, pfpOptions);
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
