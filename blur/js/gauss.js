import {Ball} from './ball.js';
import {Framebuffer} from './gauss_buffer.js';

let asyncSetupDone = false;
let blurShader;
let blurAmount = 1;

let canvas;
let buffer;

let balls = [];

export const sketch = (p) => {
	p.setup = async () => {
		/////////////////////////////////////////////
		const { offsetWidth, offsetHeight } = p._userNode;
		canvas = p.createCanvas(offsetWidth, offsetHeight, p.WEBGL);
		p.pixelDensity(1);

		buffer = new Framebuffer(p);

		/////////////////////////////////////////////
		const blurVert = await p.httpGet('./glsl/basic.vert');
		const blurFrag = await p.httpGet('./glsl/gauss.frag');
		blurShader = p.createShader(blurVert, blurFrag);

		/////////////////////////////////////////////
		for (let i = 0; i < 10; i += 1) {
			balls[i] = new Ball(p);
		}

		asyncSetupDone = true;
	};

	p.windowResized = () => {
		/////////////////////////////////////////////
		const { offsetWidth, offsetHeight } = p._userNode;
		p.resizeCanvas(offsetWidth, offsetHeight);
	};

	p.draw = () => {
		/////////////////////////////////////////////
		if (!asyncSetupDone) return;
		if (p._fps.request && p.frameCount % 10 === 0) p._fps.element.innerText = `${p.nfc(p.frameRate(), 1)} fps`;


		// start
buffer.draw(() => {
	p.push();
	p.background(50);
	p.noStroke();
	p.noStroke();
	p.fill(255);
	for (const ball of balls) {
		ball.update();
		p.ellipse(ball.x - 0.5 * p.width, ball.y - 0.5 * p.height, ball.r);
	}
	p.pop();
})

/////////////////////////////////////////////
blurAmount = p.ceil(1 + 16 * p.constrain(1 - p.mouseY/p.height, 0, 1));

p.clear();
p.push();
p.rectMode(p.CENTER);
p.noStroke();
p.shader(blurShader);
blurShader.setUniform('uResolution', [p.width, p.height]);
blurShader.setUniform('uAmount', blurAmount);
blurShader.setUniform('uTexture', buffer.targetTexture);
p.rect(0, 0, p.width, -p.height);
p.pop()
// end
	};
};