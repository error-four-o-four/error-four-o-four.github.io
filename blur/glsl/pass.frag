#ifdef GL_ES
  precision highp float;
  precision highp int;
#endif

varying vec2 vTexCoord;

uniform vec2 uResolution;

void main() {
	vec2 uv = (gl_fragCoord.xy - .5 * uResolution.xy) / uResolution.y;
	// vec2 uv = (vTexCoord + 1.)/2.;
	// vec3 tex = texture2D(s_InputTex, uv).rgb;

	gl_FragColor = vec4(uv, 0., 1.);
	// gl_FragColor = vec4(tex, 1.);
}