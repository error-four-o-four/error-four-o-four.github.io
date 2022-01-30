#version 300 es

precision highp float;
precision highp int;

#define PI      3.14159265358
#define TAU     6.28318530718
#define SQRT3   1.73205080757

uniform vec2 u_resolution;
uniform float u_time;

out vec4 fragout;

const vec2 repeat = vec2(1., SQRT3);
const vec2 height = .5 * repeat;

vec2 rot(vec2 uv, in float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c) * uv;
}

vec4 HexCoords(vec2 uv) {
    vec2 a = mod(uv, repeat) - height;
    vec2 b = mod(uv - height, repeat) - height;
    vec2 gv = dot(a, a) < dot(b, b) ? a : b;
    vec2 id = uv - gv;
    return vec4(gv.x, gv.y, id.x, id.y);
}

float HexDist(vec2 p) {
    p = abs(p);
    float c = dot(p, normalize(vec2(1., SQRT3)));
    return max(c, p.x);
}

vec2 HexAdj(int dir) {
    vec2 adj = (dir == 1 || dir == 4) ? vec2(2., 0.) : vec2(1., SQRT3);

    if (dir < 3) adj.x *= -1.;
    if (dir > 1 && dir < 5) adj.y *= -1.;

    return adj;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * u_resolution.xy) / u_resolution.y;
    vec3 rgb;

    float d = HexDist(uv);
    float r = .25;
    float s = fwidth(abs(d));
    float l = 0.;

    float m = .25;
    float n = .0375;

    for (int i = 0; i < 6; i += 1) {
        d = HexDist(uv - .0625 * HexAdj(i));
        r = m + n * sin(.25 * TAU * u_time + float(i) * PI / 3.);
        s = fwidth(abs(d));
        l += smoothstep(r, .375 * r, d) - smoothstep(r + s, r - s, d);
    }

    rgb.r = mix(0., l, .25);
    rgb.b = mix(0., l, .01);

    rgb = pow(rgb,vec3(0.4545));

    fragout = vec4(rgb, 1.0);
}