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
vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    // Here is where the offset is happening
    _st.x += step(1.0, mod(_st.y, 2.0)) * sin(u_time);
    // _st.y += step(1.0, mod(0.5, 2.0)) * 0.5;

    return fract(_st);
}

float plot(in vec2 _st, in float _pct) {
    return  smoothstep( _pct - 0.02, _pct, _st.y) -
            smoothstep( _pct, _pct + 0.02, _st.y);
}

float sinusoidal(in float _pct) {
    return 0.5 + 0.5 * sin(_pct * TAU - 0.5 * PI);
}

float u[3];
float t[3];

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv = st;
    vec3 rgb = vec3(0.0);

    // st = tile(st, 3.);

    u[0] = 0.10 * PI * u_time + st.y;
    st = rotate2D(st, PI / 3.0);
    u[1] = 0.075 * PI * u_time + st.y;
    st = rotate2D(st, PI / 3.0);
    u[2] = 0.05 * PI * u_time + st.y;

    float off = 1.0 - sinusoidal(uv.x) * sinusoidal(uv.y);
    t[0] = 0.05 + 2.0 * sinusoidal(u[0]) * off;
    t[1] = 0.05 + 2.0 * sinusoidal(u[1]) * off;
    t[2] = 0.05 + 2.0 * sinusoidal(u[2]) * off;

    vec2 pos = vec2(0.5);
    float rad = 0.25;
    float r = smoothcircle(st, pos, rad, t[0]);
    float g = smoothcircle(st, pos, rad, t[1]);
    float b = smoothcircle(st, pos, rad, t[2]);

    rgb = vec3(r, g, b);
    // rgb = vec3(r, g, 0.0);
    // rgb = vec3(r);
    // rgb = vec3(g);
    // rgb = vec3(b);

    gl_FragColor = vec4(rgb, 1.0);
}