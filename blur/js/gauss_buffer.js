class RawTextureWrapper extends p5.Texture {
	constructor (renderer, obj, w, h) {
		super(renderer, obj);
		this.width = w;
		this.height = h;
		return this;
	}

	_getTextureDataFromSource() {
		return this.src;
	}

	init(tex) {
		this.glTex = tex;

		this.glWrapS = this._renderer.textureWrapX;
		this.glWrapT = this._renderer.textureWrapY;

		this.setWrapMode(this.glWrapS, this.glWrapT);
		this.setInterpolation(this.glMinFilter, this.glMagFilter);
	}

	update() {
		return false;
	}
}

export class Framebuffer {
	constructor (canvas) {
		this._renderer = canvas._renderer;

		const gl = this._renderer.GL;
		const width = this._renderer.width;
		const height = this._renderer.height;
		const density = this._renderer._pInst._pixelDensity;

		const targetTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, targetTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width * density, height * density, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

		const framebuffer = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, targetTexture, 0);

		const targetP5Texture = new RawTextureWrapper(this._renderer, targetTexture, width * density, height * density);
		this._renderer.textures.push(targetP5Texture);

		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		this.framebuffer = framebuffer;
		this.targetTexture = targetTexture;
	}

	draw(cb) {
		this._renderer.GL.bindFramebuffer(this._renderer.GL.FRAMEBUFFER, this.framebuffer);
		cb();
		this._renderer.GL.bindFramebuffer(this._renderer.GL.FRAMEBUFFER, null);
	}
}