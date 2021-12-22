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

vec2 rot(vec2 _st, in float _angle) {
    float s = sin(_angle);
    float c = cos(_angle);
    return mat2(c, -s, s, c) * _st;
}
vec2 rotate2D(vec2 _st, in float _angle, in vec2 _pos) {
    // _st -= _pos;
    _st = mat2(
        cos(_angle), -sin(_angle),
        sin(_angle), cos(_angle)) * _st;
    // _st += _pos;
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

vec2 createAxis(in vec2 _st, in float _zoom, in float _angle, in float _off) {
    _st = mat2(
        cos(_angle), -sin(_angle),
        sin(_angle), cos(_angle)) * _st;
    vec2 axis = _st;
    // axis.x += _off;

    axis = rotate2D(axis, _angle, vec2(0.0));
    axis.y /= 0.5 * sqrt3;
    axis *= _zoom;
    axis.x += step(1.0, mod(axis.y, 2.0)) * 0.5;
    return fract(axis);
}

float radiusFromAngle(in float _angle) {
    return clamp(0.375 + 0.5 * _angle, 0.0, 0.75);
}

// float blurFromAngle(in float _angle) {
//     return clamp(0.95 * _angle, 0.05, 0.95);
// }

const float s = 4.0;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    vec2 axisA = createAxis(st, s, 0.0, 0.5);
    vec2 axisB = createAxis(st, s, TAU / 6.0, 0.5);
    vec2 axisC = createAxis(st, s, 2.0 * TAU / 6.0, 0.5);
    vec3 rgb = vec3(0.0);


    vec2 pos = vec2(0.5);

    float angleA = rot(st - vec2(0.5, 1.0), u_time).y;
    float angleB = rot(st, u_time).y;
    float angleC = rot(st - vec2(1.0, 0.0), u_time).y;

    float blr = 1.0 - 0.9 * sinusoidal(st.x) * sinusoidal(st.y);

    float r = smoothcircle(axisA, pos, radiusFromAngle(angleA), blr);
    float g = smoothcircle(axisB, pos, radiusFromAngle(angleB), blr);
    float b = smoothcircle(axisC, pos, radiusFromAngle(angleC), blr);

    rgb = vec3(r, g, b);
    // rgb = vec3(axisA, 0.0);
    // rgb = vec3(0.0, axisB);
    // rgb = vec3(axisC.y, 0.0, axisC.x);

    gl_FragColor = vec4(rgb, 1.0);
}