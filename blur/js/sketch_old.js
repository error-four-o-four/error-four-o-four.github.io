// import { Framebuffer } from './bff/framebuffer.js';
import { vert, frag } from './shader_old.js';

const wrap = document.getElementById('canvas-wrap');
const getWrapSize = () => [wrap.offsetWidth, wrap.offsetHeight];

const nPasses = 5;
const iFinal = nPasses;
const shaders = [];
const graphics = [];
const createCustomGraphic = (w, h, r = 'p2d', p = window) => new p5.Graphics(w, h, r, p).pixelDensity(1).noStroke();
const getGraphicSizes = (w, h) => [...Array.from({ length: nPasses }).keys()].map((v) => [~~(w / 2 ** v), ~~(h / 2 ** v)]);

let sizes = [];
let fps = 0;
let acc = 0;
/////////////////////////////////////////////
window.setup = () => {
	const [canvasWidth, canvasHeight] = getWrapSize();
	const canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent(wrap);

	sizes = getGraphicSizes(~~(canvasWidth / 2), ~~(canvasHeight / 2));

	for (let i = 0; i < nPasses; i += 1) {
		graphics[i] = createCustomGraphic(...sizes[i], WEBGL);
		shaders[i] = graphics[i].createShader(vert, frag);
		// buffers[i] = new Framebuffer(graphics[i]);
	}
	graphics.push(createCustomGraphic(...sizes[0], WEBGL));
	shaders.push(graphics[graphics.length - 1].createShader(vert, frag));
};
window.windowResized = () => {
	const [canvasWidth, canvasHeight] = getWrapSize();
	sizes = getGraphicSizes(~~(canvasWidth / 2), ~~(canvasHeight / 2));

	resizeCanvas(canvasWidth, canvasHeight);
	for (const [i, g] of graphics.entries()) {
		g.resizeCanvas(...sizes[i % nPasses])
	}
};
/////////////////////////////////////////////
window.draw = () => {
	if (frameCount < 6000) {
		if (frameCount % 600 === 0) console.log('counting', acc / frameCount, frameRate());
		acc += frameRate();
	} else {
		console.log(`${nPasses} passes\n${frameCount} - average ${acc / frameCount}`,  );
		noLoop();
		return;
	}
	clear();

	// buffers[0].draw(() => {
	// })

	// draw original
	graphics[0].push();
	graphics[0].background(0, 255 * (0.5 + 0.5 * Math.sin(Math.PI * frameCount / 300 - 0.5 * Math.PI)), 0);
	graphics[0].rotate(radians(frameCount));
	graphics[0].fill(255, 0, 0);
	graphics[0].rect(-80, -40, 160, 80);
	graphics[0].pop();
	image(graphics[0], 0, 0);

	for (let x = 0, n = 1, nn = nPasses * 2 - 1; n < nn; n += 1) {
		if (n === nPasses) continue;
		const isDownsampling = n < nPasses;
		const i = (isDownsampling) ? n : nn - n;
		const j = (isDownsampling) ? i - 1 : i + 1;

		graphics[i].shader(shaders[i]);
		shaders[i].setUniform('uResolution', sizes[i]);
		shaders[i].setUniform('uIsDownsampling', isDownsampling);
		shaders[i].setUniform('uIsUpsampling', !isDownsampling);
		shaders[i].setUniform('uFinalStep', false);
		shaders[i].setUniform('uTexture', graphics[j]);
		graphics[i].rect(0, 0, ...sizes[i]);

		// image(graphics[i], x, 0.5 * height + 8);

		// x += graphics[i].width + 8;
	}

	graphics[iFinal].shader(shaders[iFinal]);
	shaders[iFinal].setUniform('uResolution', sizes[0]);
	shaders[iFinal].setUniform('uIsDownsampling', false);
	shaders[iFinal].setUniform('uIsUpsampling', false);
	shaders[iFinal].setUniform('uTexture', graphics[1]);

	shaders[iFinal].setUniform('uFinalStep', true);
	shaders[iFinal].setUniform('uOriginal', graphics[0]);
	graphics[iFinal].rect(0, 0, ...sizes[0]);

	image(graphics[iFinal], 0.5 * width, 0);

	if (frameCount % 30 === 0) fps = frameRate();
	push();
	noStroke();
	fill(255);
	text(nfc(fps, 2), 20, 20);
	pop();
};

window.keyPressed = () => {
	if (keyCode !== 83) return;

	saveCanvas(`export_${Date.now()}`, `png`);
};