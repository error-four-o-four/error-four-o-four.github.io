export const sketch = (p) => {
	let s;

	let a = 0;
	let b;

	p.preload = () => {
		s = p.loadShader(p._init.vert, p._init.frag);
	}
	p.setup = () => {
		p.createCanvas(p._init.width, p._init.height, p.WEBGL);
		p.pixelDensity(1);

		b = p.createGraphics(p.width, p.height);
		b.pixelDensity(1);
	}
	p.draw = () => {
		if (p.frameCount === 1) p._cleanup();

		b.clear();
		b.noStroke();
		b.fill(255);
		b.ellipse(0.5 * b.width, 0.5 * b.height, 0.5 * b.width + 0.25 * b.width * p.sin(a));

		s.setUniform('uResolution', [p.width, p.height]);
		s.setUniform('uTexture', b);

		p.clear();
		p.shader(s);
		p.rect(0, 0, p.width, p.height);

		a += 0.01;
	}
	p.windowResized = () => {
		p.resizeCanvas(p._userNode.offsetWidth, p._userNode.offsetHeight);
	}

	p.keyReleased = () => {
		if (p.keyCode !== 32) return;

		(p.isLooping()) ? p.noLoop() : p.loop();
	}
}