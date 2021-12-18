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

// float rect (float margin, vec2 _st) {
//     vec2 bl = step(vec2(margin), _st);
//     vec2 tr = step(vec2(margin), 1.0 - _st);
//     return bl.x * bl.y * tr.x * tr.y;
// }

// float smoothRect (float margin, float border, vec2 _st) {
//     vec2 bl = smoothstep(vec2(margin - border), vec2(margin), _st);
//     vec2 tr = smoothstep(vec2(margin - border), vec2(margin), 1.0 - _st);
//     return bl.x * bl.y * tr.x * tr.y;
// }

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

const int amount = 5;
float polygons[amount];


void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    // vec3 outer = vec3(rect(0.1 + 0.05 * sin(u_time), st));
    // gl_FragColor = vec4(outer, 1.0);

    // vec3 outer = vec3(rect(0.1 + 0.05 * sin(u_time), st));
    // vec3 canvas = outer * vec3(st.y, st.x, 0.0);
    // gl_FragColor = vec4(canvas, 1.0);

    // vec3 outer = vec3(smoothRect(0.2, 0.05 + 0.025 * sin(u_time), st));
    // float x = 0.5 + 0.5 * sin(st.x + PI + 2.0 * u_time);
    // float y = 0.5 + 0.5 * sin(st.y + PI + 3.0 * u_time);
    // vec3 canvas = 0.75 * outer * vec3(x, 0.0, y);
    // gl_FragColor = vec4(canvas, 1.0);

    vec3 rgb = vec3(0.0);

    for (int i = 0; i < amount; i += 1) {
        float j = float(i);
        float radius = 0.1 + 0.05 * sin(PI * j + PI * u_time - 0.5 * PI);
        float offsetX = mod(u_time + 0.5 * j, 1.3) - 0.15;
        float offsetY = 0.5 + (j - 0.5 * float(amount)) * 0.125;
        vec2 pos = vec2(offsetX, offsetY);
        polygons[i] = polygon(st, pos, radius, 3 + i, (1.0 + 0.5 * j) * u_time);

        rgb += vec3(polygons[i], 0.0, 0.0);
    }

    // float gon = polygon(st, pos, radius, 5, PI * u_time);

    gl_FragColor = vec4(rgb, 1.0);


}