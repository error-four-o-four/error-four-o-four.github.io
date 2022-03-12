export class RawTextureWrapper extends p5.Texture {
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
		// const gl = this._renderer.GL;
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