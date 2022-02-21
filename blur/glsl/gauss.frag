#version 300 es

precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform float uAmount;
uniform sampler2D uTexture;

in vec2 vTexCoord;
out vec4 fragColor;

vec4 gauss(vec2 texCoord, vec2 resolution, sampler2D tex, float radius) {
    vec4 sum = vec4(0.);
    float v = .3780/pow(radius,1.975);
    float dx = 1. / resolution.x;
    float dy = 1. / resolution.y;
    vec2 p = vec2(0.);
    p.x = texCoord.x + (-radius * dx);

    float x, y, xSq, ySq, wgt;
    float rSq = radius * radius;
    for(x; x <= radius; x++){
        xSq = x * x;
        p.y = texCoord.y + (-radius * dy);
        for(y = -radius; y <= radius; y++){
            ySq = y * y;
            if(xSq + ySq <= rSq){
                wgt = v * exp((-xSq - ySq) / (2. * rSq));
                sum += wgt * texture(tex, p);
            }
            p.y += dy;
        }
        p.x += dx;
    }
    return sum;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec3 rgb = gauss(vTexCoord, uResolution, uTexture, uAmount).rgb;

    fragColor = vec4(rgb, 1.);
}