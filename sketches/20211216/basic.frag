#ifdef GL_ES
      precision highp float;
      precision highp int;
#endif

#define PI 3.14159265358979323846
#define TAU 6.28318530718
#define PHI 1.61803398874989484820459  // Φ = Golden Ratio


uniform vec2 u_resolution;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
      vec2(16.9,0.630)))*
      43758.5453123
		);
}

float box(in vec2 _st, in vec2 _size) {
    _size = vec2(0.5) - _size * 0.5;
    vec2 uv = smoothstep(
        _size,
        _size + vec2(0.005),
        _st
    );
    uv *= smoothstep(
        _size,
        _size + vec2(0.005),
        vec2(1.0) - _st
    );
    return uv.x * uv.y;
}

float circle(in vec2 _st, in vec2 _center, in float _radius) {
    vec2 dist = _st - _center;
    return 1.0 - smoothstep(
        _radius - (_radius * 0.01),
        _radius + (_radius * 0.01),
        dot(dist, dist) * 4.0
    );
}

float polygon(in vec2 _st, in vec2 _center, in float _radius, in int _N, in float _angle) {
    float a = atan(_center.x - _st.x, _center.y - _st.y) + PI + _angle;
    float r = TAU / float(_N);
    float d = cos(floor(0.5 + a / r) * r - a) * length(_center - _st);

    return 1.0 - smoothstep(
        _radius - (_radius * 0.01),
        _radius + (_radius * 0.01),
        d
    );
}

vec2 rotate2D(vec2 _st, in float _angle) {
    _st -= 0.5;
    _st = mat2(
        cos(_angle), -sin(_angle),
        sin(_angle), cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, in float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

float plot(in vec2 _st, in float _pct) {
    return  smoothstep( _pct - 0.02, _pct, _st.y) -
            smoothstep( _pct, _pct + 0.02, _st.y);
}

float sinusoidal(in float _pct) {
    return 0.5 + 0.5 * sin(_pct * TAU - 0.5 * PI);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 rgb = vec3(0.0);

    // st = tile(st, 2.);
    // st = rotate2D(st, 0.5 * PI);
    float t = mod(0.5 * u_time, 1.0);

    float r = fract((st.y - 0.5) * 2.5 - t);
    float g = fract((st.y - 0.5) * 3.0 - t);
    float b = fract((st.y - 0.5) * 3.5 - t);

    // float r = fract(st.x * 9.0);
    // float g = fract(st.x * 10.0);
    // float b = fract(st.x * 11.0);

    float o = 0.5;
    float p = 0.49;
    float q = 0.51;

    rgb[0] = smoothstep(p - o * sinusoidal(st.x), 0.5, r) - smoothstep(0.5, q + o * sinusoidal(st.x), r);
    rgb[1] = smoothstep(p - o * sinusoidal(st.x), 0.5, g) - smoothstep(0.5, q + o * sinusoidal(st.x), g);
    rgb[2] = smoothstep(p - o * sinusoidal(st.x), 0.5, b) - smoothstep(0.5, q + o * sinusoidal(st.x), b);

    // float y = sinusoidal(st.x);
    // float pct = plot(st, y);

    // rgb[2] = pct;

    gl_FragColor = vec4(rgb, 1.0);
}