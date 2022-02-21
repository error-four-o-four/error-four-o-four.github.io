import hljs from './js/hl/core.min.js';
import glsl from './js/hl/glsl.min.js';
import javascript from './js/hl/javascript.min.js';

hljs.registerLanguage('glsl', glsl);
hljs.registerLanguage('javascript', javascript);

document.addEventListener('DOMContentLoaded', function init() {
	const divsCanvas = [...document.getElementsByClassName('canvas-wrap')];
	const divsText = [...document.getElementsByClassName('text-wrap')];

	createSketch(divsCanvas[0], './js/twopass.js');
	createText(divsText[0], './js/twopass.js', 'js');
	createText(divsText[0], './glsl/twopass.frag');

	createSketch(divsCanvas[1], './js/gauss.js');
	createText(divsText[1], './js/gauss.js', 'js');
	createText(divsText[1], './glsl/gauss.frag');
});

async function createSketch(parent, url) {
	/////////////////////////////////////////////
	const container = document.createElement('div');
	container.classList.add('info-container');
	parent.append(container);

	/////////////////////////////////////////////
	const input = document.createElement('span');
	input.classList.add('toggle-looping');
	input.innerText = 'run sketch';
	container.append(input);

	/////////////////////////////////////////////
	const meter = document.createElement('span');
	meter.classList.add('show-fps');
	meter.innerText = '0 fps';
	container.append(meter);

	/////////////////////////////////////////////
	const { sketch } = await import(url);
	const instance = new p5(sketch, parent.children[0]);
	instance.noLoop();
	instance._fps = {
		accumulated: 0,
		average: 0,
		element: meter,
		request: false,
	}

	input.addEventListener('click', toggleLooping.bind(null, instance));

	function toggleLooping(i, e) {
		if (e.button !== 0) return

		const isLooping = i.isLooping();
		if (isLooping) {
			i.noLoop();
			i._fps.request = false;
			i._fps.element.innerText = '0 fps';
			e.target.innerText = 'run sketch';
		}
		else {
			i.loop();
			i._fps.request = true;
			e.target.innerText = 'stop';
		}
	}
}

async function createText(parent, url, type = 'glsl') {
	const response = await fetch(url);
	const container = document.createElement('div');
	container.classList.add('text-container');

	const element = document.createElement('pre');
	if (type === 'glsl') {
		element.innerHTML = await response.text();
	}
	else {
		const string = await response.text();
		const start = string.indexOf('// start') + 8;
		const end = string.indexOf('// end');
		element.innerHTML = string.substring(start, end);

		// .replace(/^\t+|\t+$/gm,'')
	}
	hljs.highlightElement(element);
	container.append(element);
	parent.append(container);
}