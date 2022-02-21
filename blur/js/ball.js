export class Ball {
	constructor(p) {
		this.p = p;
		this.x = p.random(0, p.width);
		this.y = 0;
		this.v = 0;
		this.r = 0;
		this.spawn();
	}
	update() {
		this.x += this.v;
		if (this.x > this.p.width + this.r) {
			this.x = -this.r;
			// this.spawn();
		}
	}
	spawn() {
		const {p} = this;
		this.y = p.random(0, p.height);
		this.v = p.random(1, 5);
		this.r = p.random(0.05 * p.height, 0.15 * p.height);
	}
	draw() {
		this.p.ellipse(this.x, this.y, this.r);
	}
}