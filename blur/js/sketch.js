import { Framebuffer } from './bff/framebuffer.js';
import { vert, frag } from './shader.js';

const wrap = document.getElementById('canvas-wrap');
const getWrapSize = () => [wrap.offsetWidth, wrap.offsetHeight];

const nPasses = 5;
const shaders = [];
const buffers = [];
const graphics = [];
const createCustomGraphic = (w, h, r = 'p2d', p = window) => new p5.Graphics(w, h, r, p).pixelDensity(1).noStroke();
const getGraphicSizes = (w, h) => [...Array.from({ length: nPasses }).keys()].map((v) => [~~(w / 2 ** v), ~~(h / 2 ** v)]);

let original;
let sizes = [];
let fps = 0;

/////////////////////////////////////////////
window.setup = () => {
	const [canvasWidth, canvasHeight] = getWrapSize();
	const canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent(wrap);

	sizes = getGraphicSizes(~~(canvasWidth / 2), ~~(canvasHeight / 2));
	original = createCustomGraphic(...sizes[0]);
	for (let i = 0; i < nPasses; i += 1) {
		graphics[i] = createCustomGraphic(...sizes[i], WEBGL);
		buffers[i] = new Framebuffer(graphics[i]);
		shaders[i] = new p5.Shader(graphics[i]._renderer, vert, frag);
	}
};
window.windowResized = () => {
	const [canvasWidth, canvasHeight] = getWrapSize();
	resizeCanvas(canvasWidth, canvasHeight);
	sizes = getGraphicSizes(~~(canvasWidth / 2), ~~(canvasHeight / 2));
	original.resizeCanvas(...sizes[0]);
	for (const [i, g] of graphics.entries()) {
		g.resizeCanvas(...sizes[i]);
	}
};
/////////////////////////////////////////////
window.draw = () => {
	// if (frameCount < 6000) {
	// 	if (frameCount % 600 === 0) console.log('counting', acc / frameCount, frameRate());
	// 	acc += frameRate();
	// } else {
	// 	console.log(acc / frameCount);
	// 	noLoop();
	// 	return;
	// }
	clear();

	original.push();
	original.background(0, 255 * (0.5 + 0.5 * Math.sin(Math.PI * frameCount / 300 - 0.5 * Math.PI)), 0);
	original.translate(0.5 * original.width, 0.5 * original.height);
	original.rotate(radians(frameCount));
	original.fill(255, 0, 0);
	original.rect(-80, -40, 160, 80);
	original.pop();

	image(original, 0, 0);

	for (let x = 0, n = 1, nn = nPasses * 2 - 1; n <= nn; n += 1) {
		if (n === nPasses) continue;
		const isDownsampling = n < nPasses;
		const i = (isDownsampling) ? n : nn - n;
		const tex = (n === 1) ? original : (isDownsampling) ? graphics[i - 1] : graphics[i + 1];

		buffers[i].draw(() => {
			shaders[i].setUniform('uResolution', sizes[i]);
			shaders[i].setUniform('uIsDownsampling', isDownsampling);
			shaders[i].setUniform('uTexture', tex);
			graphics[i].push();
			graphics[i].shader(shaders[i]);
			graphics[i].rect(-0.5 * sizes[i][0], -0.5 * sizes[i][1], sizes[i][0], sizes[i][1]);
			graphics[i].pop();
		});
		graphics[i].push();
		graphics[i].image(buffers[i].color, -0.5 * sizes[i][0], 0.5 * sizes[i][1], sizes[i][0], -sizes[i][1]);
		graphics[i].pop();

		if (n < nn) {
			image(graphics[i], x, 0.5 * height + 8);
			x += graphics[i].width + 8;
		}
		else {
			image(graphics[i], 0.5 * width, 0);
		}
	}
	image(graphics[0], 0.5 * width, 0);

	if (frameCount % 15 === 0) fps = frameRate();
	push();
	noStroke();
	fill(255);
	text(nfc(fps, 2), 20, 20);
	pop();
};

// window.keyPressed = () => {
// 	if (keyCode !== 83) return;

// 	saveCanvas(`export_${Date.now()}`, `png`);
// };