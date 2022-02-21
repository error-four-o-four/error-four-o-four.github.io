#version 300 es

precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform int uAxis;
uniform float uAmount;
uniform sampler2D uTexture;

in vec2 vTexCoord;
out vec4 fragColor;

void main() {
    // vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 uv = (gl_FragCoord.xy - .5 * uResolution.xy) / uResolution.y;
    vec4 rgba = vec4(0.);

    float r = uAmount;
    float rSq = r * r;
    float d = (uAxis == 0) ? 1. / uResolution.x : 1. / uResolution.y;

    float wgt = 0.;
    float wgt0 = 0.5135 / pow(r, 0.96);

    vec2 p = vTexCoord;

    if (uAxis == 0) {
        p.x += -r * d;
        for (float x = -r; x <= r; x++) {
            wgt = wgt0 * exp((-x * x) / (2. * rSq));
            rgba += wgt * texture(uTexture, p);
            p.x += d;
        }
    }
    if (uAxis == 1) {
        p.y += -r * d;
        for (float y = -r; y <= r; y++) {
            wgt = wgt0 * exp((-y * y) / (2. * rSq));
            rgba += wgt * texture(uTexture, p);
            p.y += d;
        }
    }

    fragColor = rgba;
}