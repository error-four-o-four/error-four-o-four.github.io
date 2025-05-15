import './style.css';

(async () => {
	const main = await import('./js/index.js').then((module) => module.default);

	main();
})();
