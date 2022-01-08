#ifdef GL_ES
      precision highp float;
      precision highp int;
#endif

#define PI 3.14159265358979323846
#define TAU 6.28318530718
#define PHI 1.61803398874989484820459  // Φ = Golden Ratio


uniform vec2 u_resolution;
uniform float u_time;

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

vec2 wrappedTile(vec2 _st, in float _zoom, in vec2 _shift) {
    _st *= _zoom;
    _st += _shift;
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
    vec2 tu = st;
    vec2 uv = st;

    float n = 10.0;
    tu = wrappedTile(tu, n, vec2(0.5, 0.5));
    uv = tile(uv, n);

    vec2 p = vec2(0.5);
    float t = 0.1 * u_time;

    float r = 0.25 + sinusoidal(st.y + t);
    // float b = 2.05 - 2.0 * sinusoidal(st.x);
    float b = 0.1;

    float c1 = smoothcircle(tu, p, r, b);
    float c2 = smoothcircle(uv, p, r, b);

    float c = c1 * c2;
    vec3 rgb = vec3(sinusoidal(smoothstep(-0.5, 1.5, st.x)) * c);
    // vec3 rgb = vec3(st.x * c, sinusoidal(1.0 - st.y) * c, sinusoidal(1.0 - st.x) * c);
    // vec3 rgb = vec3(c1) * vec3(c2);

    gl_FragColor = vec4(rgb, 1.0);
}