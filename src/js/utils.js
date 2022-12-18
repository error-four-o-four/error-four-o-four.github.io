export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const debounce = (fn, ms = 150) => {
	let timer;

	return function debouncedFn() {
		const ctxt = this;
		const args = Array.from(arguments);
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => fn.apply(ctxt, args), ms);
	}
}

export const getJsonData = async (url) => {
	const fetched = await fetch(url);
	return await fetched.json();
}

export const titleCase = (str) => str.at(0).toUpperCase() + str.substring(1);

export const animateTo = (elt, keyframes, options) => {
  const animation = elt.animate(
    keyframes, {
      ...options,
      fill: 'forwards'
    },
  );
  animation.addEventListener('finish', () => {
    animation.commitStyles();
    animation.cancel();
  })
  return animation;
}