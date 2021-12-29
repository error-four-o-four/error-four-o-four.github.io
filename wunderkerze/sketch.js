let s;

function preload() {
	s = loadShader('basic.vert', 'basic.frag');
}

function setup() {
	let w = getSize();
	let canvas = createCanvas(w, w, WEBGL);
	canvas.parent('canvas-wrap');
	pixelDensity(1);
}

function draw() {
	clear();

	s.setUniform('u_resolution', [width, height]);
	s.setUniform('u_time', millis() / 1000);

	shader(s);
	rect(0, 0, width, height);
}

function keyPressed() {
	if (keyCode !== 32) return;

	(isLooping()) ? noLoop() : loop();
}

function windowResized() {
	let w = getSize();
	resizeCanvas(w, w);
}

function getSize() {
	return 0.9 * Math.min(windowWidth, windowHeight);
}