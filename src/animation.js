const section = document.getElementById('section-welcome');
section.classList.add('loading');

const pfp = document.getElementById('img-pfp');
const bg = document.getElementById('img-pfp-bg');

createOnloadListener();

function createOnloadListener() {
	if (!pfp.complete) pfp.addEventListener('load', triggerOnloadEvent);

	if (!bg.complete) bg.addEventListener('load', triggerOnloadEvent);

	triggerOnloadEvent();
}

function triggerOnloadEvent(e) {
	if (!pfp.complete || !bg.complete) return;

	pfp.removeEventListener('load', triggerOnloadEvent);
	bg.removeEventListener('load', triggerOnloadEvent);

	setTimeout(() => {
		section.classList.remove('loading');
		playAnimation();
	}, 500);
}

function playAnimation() {
	// animate background
	const bgKeyframes = [{ opacity: 0 }, { opacity: 1 }];
	const bgOptions = {
		duration: 200,
		easing: 'ease-out',
	};
	animateTo(bg, bgKeyframes, bgOptions);

	// animate profile picture
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

	pfp.style.transformOrigin = 'bottom center';
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
