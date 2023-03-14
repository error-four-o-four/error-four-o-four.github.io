import elements from './elements.js';

export const promisedSvgs = new Promise(async (res, rej) => {
	try {
		const response = await fetch('./svgs.json');
		const data = await response.json();
		res(data);
	} catch (error) {
		console.log(error);
		rej(null);
	}
});

export function getSvgAttributes(elt) {
	return {
		slug: elt.getAttribute('data-slug'),
		hex: elt.getAttribute('data-hex'),
	};
}

export function injectSvgs(data) {
	const elts = [...document.querySelectorAll('.lazy-svg')];
	for (const elt of elts) {
		const { slug } = getSvgAttributes(elt);
		elt.children[0].innerHTML = data[slug];
	}
}

// images

export const promisedAnimationImages = Promise.allSettled([promisifyImage(elements.pfp), promisifyImage(elements.pfpBg)]);

export function promisifyImage(img, url = img.getAttribute('data-src')) {
	img.classList.add('hidden');
	img.removeAttribute('data-src');
	return new Promise((res, rej) => {
		try {
			img.onload = () => {
				img.onload = null;
				img.classList.remove('hidden');
				res(img);
			};

			img.src = url;
		} catch (error) {
			console.log(error);
			rej(null);
		}
	});
}

export function lazyloadImage(img) {
	const src = img.getAttribute('data-src');
	img.removeAttribute('data-src');

	img.onload = () => {
		img.onload = null;
		img.classList.remove('hidden');
	};

	img.src = src;
}

export function lazyLoadAllImages() {
	const imgs = [...document.querySelectorAll('img[data-src]')];

	for (const img of imgs) lazyloadImage(img);
}
