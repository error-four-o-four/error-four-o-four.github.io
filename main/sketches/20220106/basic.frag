#extension GL_OES_standard_derivatives : enable

precision highp float;
precision highp int;

#define PI      3.14159265358
#define TAU     6.28318530718
#define PHI     1.61803398874
#define SQRT3   1.73205080757

uniform vec2 u_resolution;
uniform float u_time;

float HexDist(vec2 p) {
    p = abs(p);
    float c = dot(p, normalize(vec2(1., SQRT3)));
    return max(c, p.x);
}

const vec2 repeat = vec2(1., SQRT3);
const vec2 height = .5 * repeat;

vec4 HexCoords(vec2 uv) {
    vec2 a = mod(uv, repeat) - height;
    vec2 b = mod(uv - height, repeat) - height;
    vec2 gv = dot(a, a) < dot(b, b) ? a : b;
    vec2 id = uv - gv;
    return vec4(gv.x, gv.y, id.x, id.y);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * u_resolution.xy) / u_resolution.y;

    float scale = 6.75;
    vec3 rgb = vec3(0.);
    vec4 hex = HexCoords(uv * scale);
    vec3 rad;

    float m = HexDist(hex.xy);
    float n = HexDist(hex.zw);
    float r = .25 + .2 * cos(2. * n - u_time);
    m = smoothstep(r, r - .05, m);

    for (int i = 0; i < 3; i += 1) {
        rad[i] = .5 + .5 * cos(3. * n - .5 * PI * float(i) - u_time);
    }

    rgb = mix(rgb, rad, m);
    gl_FragColor = vec4(pow(rgb,vec3(0.4545)), 1.0);
}