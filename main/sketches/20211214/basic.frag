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

mat2 rotate2d(float _angle) {
    return mat2(
        cos(_angle), -sin(_angle),
        sin(_angle), cos(_angle)
    );
}

const int amt = 12;
float boxes[amt];

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec4 rgba = vec4(vec3(0.0), 1.0);
    float a = 0.1;

    for (int i = 0; i < amt; i += 1) {
        float m = float(amt);
        float n = 1.0 / m;
        float j = float(i);
        float u = u_time * PI / (2.0 * m) + 0.5 * PI;
        float v = 0.5 + 0.5 * sin(u);
        vec2 s = vec2(0.5 + 0.25 * j / m);
        st -= vec2(0.5);
        st = rotate2d(v * PI) * st;
        st += vec2(0.5);
        boxes[i] = n * box(st, s);

        rgba += vec4(vec3(boxes[i]), 1.0);
    }

    gl_FragColor = rgba;
}