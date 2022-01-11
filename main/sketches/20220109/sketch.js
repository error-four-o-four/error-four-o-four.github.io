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

	p.keyReleased = () => {
		if (p.keyCode !== 32) return;

		(p.isLooping()) ? p.noLoop() : p.loop();
	}
}