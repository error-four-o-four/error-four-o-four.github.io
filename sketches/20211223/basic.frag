#ifdef GL_ES
      precision highp float;
      precision highp int;
#endif

#define PI      3.14159265
#define TAU     6.28318530
#define SQRT3   1.73205081
#define NUM_TILES 4.0

uniform vec2 u_resolution;
uniform float u_time;

vec2 rot(vec2 _st, in float _angle) {
    float s = sin(_angle);
    float c = cos(_angle);
    return mat2(c, -s, s, c) * _st;
}

float smoothcircle(in vec2 _st, in vec2 _center, in float _radius, in float _blur) {
    vec2 dist = _st - _center;
    return 1.0 - smoothstep(
        _radius - (_radius * _blur),
        _radius + (_radius * _blur),
        dot(dist, dist) * 4.0
    );
}

float sinusoidal(in float _pct) {
    return 0.5 + 0.5 * sin(_pct * PI - 0.5 * PI);
}

float h = 0.5 * SQRT3;

vec2 trigrid(in vec2 _st) {
    _st *= NUM_TILES;
    _st.x += step(h, mod(_st.y, 2.0 * h)) * 0.5;
    _st.y = mod(_st.y, h) + 0.5 * (1.0 - h);
    return fract(_st) - 0.5;
}

vec2 axis[3];

vec3 get(vec2 st, float time) {
    vec2 uv = st;

    float t = step(1.0, mod(time, 2.0)) * sinusoidal(time);
    float u = sinusoidal(2.0 * t);

    for (int i = 0; i < 3; i++) {
        axis[i] = st;

        axis[i].y += 0.5 * h / NUM_TILES;
        axis[i] = rot(axis[i], float(i) * PI / 3.0);
        axis[i].y -= 0.5 * h / NUM_TILES;

        axis[i].x *= 1.0 - 0.125 * u;
        axis[i].x += smoothstep(0.0, 1.0, t) / NUM_TILES;

        axis[i] = trigrid(axis[i]);
    }

    vec2 pos = vec2(0.0);
    float rad = 0.375 - 0.25 * u;
    float blr = 0.05;

    float r = smoothcircle(axis[0], pos, rad, blr);
    float g = smoothcircle(axis[1], pos, rad, blr);
    float b = smoothcircle(axis[2], pos, rad, blr);

    vec3 rgb = vec3(r, g, b);

	return rgb;
}

const float fps = 25.;
const float steps = 15.;

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

  vec3 col = vec3(0);

  for(float i = 0.; i < steps; i++){
    float localTime = u_time - (i/steps)/fps;
    col += get(uv, localTime);
  }
  gl_FragColor = vec4(col/steps,1);
}