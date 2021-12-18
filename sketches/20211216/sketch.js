export const sketch = (p) => {
	let s;

	p.preload = () => {
		s = p.loadShader(p._init.vert, p._init.frag);
	}
	p.setup = () => {
		p.createCanvas(p._init.width, p._init.height, p.WEBGL);
		p.pixelDensity(1);
	}
	p.draw = () => {
		if (p.frameCount === 1) p._cleanup();

		s.setUniform('u_resolution', [p.width, p.height]);
		s.setUniform('u_time', p.millis() / 1000);

		p.shader(s);
		p.rect(0, 0, p.width, p.height);
	}
	p.windowResized = () => {
		p.resizeCanvas(p._userNode.offsetWidth, p._userNode.offsetHeight);
	}
}


// const frags = '20211213 20211214'.split(' ');
// const shaders = [];
// const outputs = [];

// function preload() {
// 	for (const [i, frag] of frags.entries()) {
// 		shaders[i] = loadShader('basic.vert', 'frags/' + frag + '.frag');
// 	}
// }

// function setup() {
// 	let w = 0.95 * Math.min(windowWidth, windowHeight);
// 	let canvas = createCanvas(w, w);
// 	canvas.parent('canvas-wrap');
// 	pixelDensity(1);

// 	for (const [i, frag] of frags.entries()) {
// 		outputs[i] = createBuffer(0.475 * width);
// 	}

// 	// noLoop();
// }

// function draw() {
// 	clear();

// 	const cols = 2;

// 	for (const [i, o] of outputs.entries()) {
// 		const s = shaders[i];

// 		s.setUniform('u_resolution', [o.width, o.height]);
// 		s.setUniform('u_time', millis() / 1000);
// 		o.drawShader(s);

// 		const x = (i % 2 === 0) ? 0 : width - o.width;


// 		image(o, x, 0);
// 	}
// }

// function keyPressed() {
// 	if (keyCode !== 32) return;

// 	(isLooping()) ? noLoop() : loop();
// }

// function windowResized() {
// 	let w = Math.min(windowWidth, windowHeight);
// 	resizeCanvas(w, w);

// 	for (const o of outputs) {
// 		o.resize(0.5 * w);
// 	}
// }

// function createBuffer(w = 100, h = w) {
// 	const buffer = createGraphics(w, h, WEBGL);

// 	buffer.pixelDensity(1);
// 	buffer.halfWidth = 0.5 * w;
// 	buffer.halfHeight = 0.5 * h;

// 	buffer.drawShader = function(s) {
// 		this.shader(s);
// 		this.rect(0, 0, this.width, this.height)
// 	}

// 	buffer.resize = function(w, h = w) {
// 		this.halfWidth = 0.5 * w;
// 		this.halfHeight = 0.5 * h;
// 		this.resizeCanvas(w, h);
// 	}

// 	return buffer;
// }