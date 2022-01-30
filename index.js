import { cardsData } from './main/sketches/sketches.js';

(function init() {
	const states = 'ready running pending'.split(' ');
	const cardsWrap = document.getElementById('cards');
	const instances = {};

	cardsData.reduce((result, values) => [...result, createCard(cardsWrap, values)], []);

	function createCard(wrap, data) {
		data = Object.assign({
			title: 'test',
			thumb: 'index.png',
			type: 'animation',
			file: 'sketch.js',
			vert: 'basic.vert',
			frag: 'basic.frag',
		}, data);


		const dir = `main/sketches/${data.key}/`;
		const files = [
			`${dir}${data.thumb}`,
			`./${dir}${data.file}`,
			`${dir}${data.vert}`,
			`${dir}${data.frag}`,
		]

		const card = createElement(wrap, 'article', 'card', states[0]);
		const body = createElement(card, 'div', 'card-body');
		const thumb = createElement(body, 'img', 'card-thumb');
		const title = createElement(card, 'div', 'card-title');

		createElement(title, 'h2');
		title.children[0].innerText = data.title;

		thumb.src = files[0];

		// card.setAttribute('data-state', states[0]);
		// card.setAttribute('data-key', data.key);

		if (data.type === 'animation') {
			createElement(body, 'div', 'card-loader');
			card.onclick = handleClick.bind(card, data.key, files);
		}

		return card;
	}
	function createElement(parent, type, ...args) {
		const elt = document.createElement(type);
			for (const arg of args) {
				(arg.charAt(0) === '#')
				? elt.id = arg.slice(1)
				: elt.classList.add(arg);
			}
			return parent.appendChild(elt);
	}
	async function handleClick(key, files) {
		let instance = instances[key];
		let card = this;

		// toggle pause/play state
		if (instance) {
			instance._toggleLooping();
			return;
		}

		// load data and instantiate
		const {sketch} = await import(files[1]);

		p5.prototype.registerMethod('init', p5.prototype._onInit);

		p5.prototype.registerMethod('init', function() {
			this._init = {
				width: card.children[0].offsetWidth,
				height: card.children[0].offsetHeight,
				vert: files[2],
				frag: files[3],
			};
			this._userNode.classList.remove(states[0]);
			this._userNode.classList.add(states[2]);
		});
		instances[key] = new p5(sketch, card.children[0]);
	}

	p5.prototype._onInit = function(...args) {
		console.log(this, args)
	}
	p5.prototype._cleanup = function() {
		this._userNode.parentNode.classList.remove(states[2]);
		this._userNode.parentNode.classList.add(states[1]);

		this._userNode.removeChild(this._userNode.getElementsByClassName('card-thumb')[0]);
	}

	p5.prototype._toggleLooping = function() {
		if (this.isLooping()) {
			this.noLoop();
			this._userNode.parentNode.classList.remove(states[1]);
			this._userNode.parentNode.classList.add(states[0]);
		}
		else {
			this.loop();
			this._userNode.parentNode.classList.remove(states[0]);
			this._userNode.parentNode.classList.add(states[1]);
		}
	}


	p5.RendererGL.prototype._initContext = function() {
		try {
			this.drawingContext =
				this.canvas.getContext('webgl2', this._pInst._glAttributes) ||
				this.canvas.getContext('webgl', this._pInst._glAttributes) ||
				this.canvas.getContext('experimental-webgl', this._pInst._glAttributes);
			if (this.drawingContext === null) {
				throw new Error('Error creating webgl context');
			} else {
				const gl = this.drawingContext;
				gl.enable(gl.DEPTH_TEST);
				gl.depthFunc(gl.LEQUAL);
				gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
				this._viewport = this.drawingContext.getParameter(
					this.drawingContext.VIEWPORT
				);
			}
		} catch (er) {
			throw er;
		}
	}
})();