#version 300 es

precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform sampler2D uTexture;

in vec2 vTexCoord;
out vec4 fragColor;

vec3 kernelBlur(vec2 texCoord, sampler2D tex, float quality) {
    vec3 col = vec3(0.);
    float v = 0.;

    for(float i=0.0;i<1.0;i+=1.0/quality) {
        v = 0.9+i*0.1;//convert "i" to the 0.9 to 1 range
        col += texture( tex, texCoord*v+0.5-0.5*v).rgb;
    }
    col /= quality;
    return col;
}

vec3 radialBlur1(vec2 coord, vec2 resolution, sampler2D tex, vec2 radius) {
    // https://www.shadertoy.com/view/ltdczH
    float radMax = length(radius);

    vec3 blur = vec3(0.);
    float sum = 0.;
    float wgt = 0.;

    for (float u = -radius.x; u <= radius.x; u++) {
        for (float v = -radius.y; v <= radius.y; v++) {
            wgt = radMax - distance(u, v);
            blur += wgt * texture(tex, coord + vec2(u, v)/resolution.xy).rgb;
            sum += wgt;
        }
    }
    blur /= sum;
    return blur;
}

vec3 radialBlur2(vec2 texCoord, vec2 resolution, sampler2D tex, float radius) {
    // https://stackoverflow.com/questions/64837705/opengl-blurring
    vec3 sum = vec3(0.);
    float v=.3780/pow(radius,1.975);
    float dx=1./resolution.x;
    float dy=1./resolution.y;
    vec2 p = vec2(0.);
    p.x=texCoord.x+(-radius*dx);

    float x,y,xx,yy,w,rr=radius*radius;
    for(x=-radius;x<=radius;x++){
        xx=x*x;
        p.y=texCoord.y+(-radius*dy);
        for(y=-radius;y<=radius;y++){
            yy=y*y;
            if(xx+yy<=rr){
                w=v*exp((-xx-yy)/(2.*rr));
                sum+=w*texture(tex,fract(p)).rgb;
            }
            p.y+=dy;
        }
        p.x+=dx;
    }
    return sum;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * uResolution.xy) / uResolution.y;
    vec3 rgb = vec3(0.);
    float amount = 8.;

    if (uv.x > 0.) rgb.r = .1;
    if (uv.y > 0.) rgb.g = .1;

    if (uv.x > 0.) {
        if (uv.y > 0.) {
            rgb = max(rgb, kernelBlur(vTexCoord, uTexture, amount));
        }
        else {
            rgb = max(rgb, radialBlur1(vTexCoord, uResolution, uTexture, vec2(amount)));
        }
    }
    else {
        if (uv.y > 0.) {
            rgb = max(rgb, radialBlur2(vTexCoord, uResolution, uTexture, amount));
        }
        else {
            rgb = max(rgb, texture(uTexture, vTexCoord).rgb);
        }
    }

    fragColor = vec4(rgb, 1.);
    // fragColor = vec4(texture(uTexture, vTexCoord).rgb, 1.);
}