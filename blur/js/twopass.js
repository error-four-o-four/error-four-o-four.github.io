import {Ball} from './ball.js';

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
		canvas = p.createCanvas(offsetWidth, offsetHeight);
		buffer = p.createGraphics(p.width, p.height, p.WEBGL);

		p.pixelDensity(1);
		buffer.pixelDensity(1);

		/////////////////////////////////////////////
		const blurVert = await p.httpGet('./glsl/basic.vert');
		const blurFrag = await p.httpGet('./glsl/twopass.frag');
		blurShader = buffer.createShader(blurVert, blurFrag);

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
		buffer.resizeCanvas(offsetWidth, offsetHeight);
	};

	p.draw = () => {
		/////////////////////////////////////////////
		if (!asyncSetupDone) return;
		if (p._fps.request && p.frameCount % 10 === 0) p._fps.element.innerText = `${p.nfc(p.frameRate(), 1)} fps`;

		blurAmount = p.ceil(1 + 16 * p.constrain(1 - p.mouseY/p.height, 0, 1));

		// start
/////////////////////////////////////////////
p.push();
p.background(6);
p.noStroke();
p.fill(255);
for (const ball of balls) {
	ball.update();
	ball.draw();
}
p.push();

/////////////////////////////////////////////
buffer.push();
buffer.shader(blurShader);
blurShader.setUniform('uResolution', [canvas.width, canvas.height]);
blurShader.setUniform('uAxis', 0);
blurShader.setUniform('uAmount', blurAmount);
blurShader.setUniform('uTexture', canvas);
buffer.rect(0, 0, p.width, p.height);
buffer.pop();

p.clear();
p.image(buffer.get(), 0, 0);

buffer.push();
buffer.shader(blurShader);
blurShader.setUniform('uAxis', 1);
blurShader.setUniform('uTexture', canvas);
buffer.rect(0, 0, p.width, p.height);
buffer.pop();

p.clear();
p.image(buffer.get(), 0, 0);
// end
	};
};