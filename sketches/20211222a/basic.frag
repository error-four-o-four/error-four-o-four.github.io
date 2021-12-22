#ifdef GL_ES
      precision highp float;
      precision highp int;
#endif

#define PI 3.14159265358979323846
#define TAU 6.28318530718
#define PHI 1.61803398874989484820459  // Φ = Golden Ratio

uniform vec2 u_resolution;
uniform float u_time;

const float sqrt3 = sqrt(3.0);

float circle(in vec2 _st, in vec2 _center, in float _radius) {
    vec2 dist = _st - _center;
    return 1.0 - smoothstep(
        _radius - (_radius * 0.05),
        _radius + (_radius * 0.05),
        dot(dist, dist) * 4.0
    );
}
float smoothcircle(in vec2 _st, in vec2 _center, in float _radius, in float _blur) {
    vec2 dist = _st - _center;
    return 1.0 - smoothstep(
        _radius - (_radius * _blur),
        _radius + (_radius * _blur),
        dot(dist, dist) * 4.0
    );
}

vec2 rotate2D(vec2 _st, in float _angle, in vec2 _pos) {
    _st -= _pos;
    _st = mat2(
        cos(_angle), -sin(_angle),
        sin(_angle), cos(_angle)) * _st;
    _st += _pos;
    return _st;
}

vec2 tile(vec2 _st, in float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

vec2 wrappedTile(vec2 _st, in float _zoom, in vec2 _shift) {
    _st *= _zoom;
    _st += _shift;
    return fract(_st);
}

float sinusoidal(in float _pct) {
    return 0.5 + 0.5 * sin(_pct * TAU - 0.5 * PI);
}

float line(in float _off, in float _dir) {
    return step(_off - 0.05, _dir) - step(_off + 0.05, _dir);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv = st;
    vec3 rgb = vec3(0.0);

    float t = 0.5 * u_time;
    float s = 4.0;

    st.y = st.y + 0.1 * t;

    st.y /= 0.5 * sqrt3;
    st *= s;

    st.x += step(1.0, mod(st.y, 2.0)) * 0.5;
    st = fract(st);

    float a = 0.5 - 0.5 * uv.y * sinusoidal(t + uv.x);
    float m = step(a, 1.0 - st.x * 2.0 + st.y);
    float n = step(a, 1.0 - 2.0 * (1.0 - st.x) + st.y);
    float c = m + n;

    // rgb = vec3(c, 1.0 - 0.25 * uv.y, c);
    rgb = vec3(c, 1.0 - c, 0.25 * uv.y);

    gl_FragColor = vec4(rgb, 1.0);
}