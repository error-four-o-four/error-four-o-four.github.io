export const vert = `
#ifdef GL_ES
  precision highp float;
  precision highp int;
#endif

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = positionVec4;
  // vTexCoord = aTexCoord;
  vTexCoord = vec2(1.-aTexCoord.x, aTexCoord.y);
}
`;

export const frag = `
#ifdef GL_ES
  precision highp float;
  precision highp int;
#endif

varying vec2 vTexCoord;

uniform vec2 uResolution;
uniform bool uIsDownsampling;
uniform bool uIsUpsampling;
uniform bool uFinalStep;
uniform sampler2D uTexture;
uniform sampler2D uOriginal;

vec4 blur(vec2 uv, sampler2D tex, float stepSz){
	vec2 pxSz = 1./uResolution.xy;
	// vec2 pxSz = 1./textureSize(tex, 0).xy;
	// vec2 pxSz = vec2(1.);
	vec2 step = (pxSz*stepSz).xy;
	return (
			texture2D(tex, uv + step*vec2(-1,1)) +
			texture2D(tex, uv + step*vec2(1,1)) +
			texture2D(tex, uv + step*vec2(1,-1)) +
			texture2D(tex, uv + step*vec2(-1,-1))
	) / 4.;
}

void main() {
	vec2 uv = (vTexCoord + 1.)/2.;
	vec4 rgba = vec4(0);

	if (uFinalStep) {
		// rgba = .5 * texture2D(uOriginal, vTexCoord) + .5 * blur(vTexCoord, uTexture, .5);
		rgba = blur(vTexCoord, uTexture, .5);
		rgba.a = 1.;
	}
	else if (uIsDownsampling) {
		rgba = blur(vTexCoord, uTexture, 1.);
		rgba.a = 1.;
	}
	else if (uIsUpsampling) {
		rgba = blur(vTexCoord, uTexture, .5);
		rgba.a = 1.;
	}

	gl_FragColor = rgba;
}
`;