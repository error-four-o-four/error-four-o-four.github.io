export function assertInstanceOf<T>(
	element: unknown,
	expected: new () => T
): asserts element is T {
	if (!element || !(element instanceof expected)) {
		const received = !element ? 'null' : element.constructor.name;
		throw new Error(
			`Expected element to be a ${expected.name}, but was ${received}`
		);
	}
}

export const delay = async (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const debounce = (fn: (...args: any[]) => unknown, ms = 300) => {
	let timeout: ReturnType<typeof setTimeout>;
	return function wait(this: any, ...args: any[]) {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn.apply(this, args), ms);
	};
};

export const throttle = (func: (...args: any[]) => unknown, ms: number) => {
	let throttled: boolean;
	return function wait(this: any, ...args: any[]) {
		if (!throttled) {
			func.apply(this, args);
			throttled = true;
			setTimeout(() => {
				throttled = false;
			}, ms);
		}
	};
};

// export const createAnimation = (elt, keyframes, options, callback = null) => {
// 	const animation = elt.animate(keyframes, {
// 		...options,
// 		fill: 'forwards',
// 	});

// 	animation.addEventListener('finish', () => {
// 		if (elt.offsetParent !== null) {
// 			animation.commitStyles();
// 		}
// 		animation.cancel();
// 		callback && callback();
// 	});

// 	animation.cancel();

// 	return animation;
// };

// export const animateChained = (animations) => {
// 	const reducer = async (chain, animation) => {
// 		await chain;

// 		return new Promise((resolve) => {
// 			animation.onfinish = resolve;
// 			animation.play();
// 		});
// 	};

// 	return animations.reduce(reducer, Promise.resolve());
// };
