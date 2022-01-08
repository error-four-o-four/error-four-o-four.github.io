#ifdef GL_ES
      precision highp float;
      precision highp int;
#endif

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

vec3 rotX(vec2 uv, float angle) {
    float s = sin(angle), c = cos(angle);
    return mat3(
        1., 0., 0.,
        0., c, -s,
        0., s,  c
    ) * (vec3(uv, 0.));
}
vec3 rotY(vec2 uv, float angle) {
    float s = sin(angle), c = cos(angle);
    return mat3(
         c,  0., s,
         0., 1., 0.,
        -s,  0., c
    ) * (vec3(uv, 0.));
}

vec3 rotZ(vec2 uv, float angle) {
    float s = sin(angle), c = cos(angle);
    return mat3(
        c, -s,  0,
        s,  c,  0.,
        0., 0., 1.
    ) * (vec3(uv, 0.));
}


vec3 skew(vec2 uv, float skewX, float skewY) {
    return mat3(
        1.,         tan(skewX), 0.,
        tan(skewY), 1.,         0.,
        0.,         0.,         1.
    ) * vec3(uv, 0.);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * u_resolution.xy) / u_resolution.y;
    vec3 rgb = vec3(0.);

    float scale = 10.;

    // uv = rotZ(uv, .1 * u_time).xy;
    uv = skew(uv, 0., 0.125 * sin(u_time)).xy;
    vec4 hex = HexCoords(uv * scale);

    float m = dot(hex.xy, hex.xy) * 4.;
    rgb += .125 * m;
    rgb += dot(uv, uv);

    gl_FragColor = vec4(rgb, 1.0);
}