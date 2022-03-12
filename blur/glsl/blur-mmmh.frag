// #version 300 es

precision highp float;
precision highp int;

uniform sampler2D s_OrigTex;
uniform sampler2D s_InputTex;

uniform int uIterationCnt;
uniform int uCurrIter;
uniform bool uIsDownsampling;
uniform bool uIsUpsampling;

// uniform float uThreshold;
uniform float uRamp;
uniform float uAmount;

varying vec2 uVar;

// out vec4 C;

// bool isThresholded = false;

// vec4 get(sampler2D tex, vec2 uv){
//     if (!isThresholded)
//         return texture(tex,uv);
//     else {
//         vec4 t = texture(tex,uv);
//         return t * smoothstep(uThreshold, uThreshold + uRamp,dot(t.xyz,t.xyz));
//     }
// }

// vec4 blur(vec2 uv, sampler2D tex, float stepSz){
//     vec2 pxSz = 1./textureSize(tex, 0).xy;
//     vec2 step = (pxSz*stepSz).xy;
//     return (
//         get(tex,uv + step*vec2(-1,1)) +
//         get(tex,uv + step*vec2(1,1)) +
//         get(tex,uv + step*vec2(1,-1)) +
//         get(tex,uv + step*vec2(-1,-1))
//     ) / 4.;
// }

vec4 blur(vec2 uv, sampler2D tex, float stepSz){
    // vec2 pxSz = 1./textureSize(tex, 0).xy;
    vec2 pxSz = vec2(1.);
    vec2 step = (pxSz*stepSz).xy;
    return (
        texture2D(tex,uv + step*vec2(-1,1)) +
        texture2D(tex,uv + step*vec2(1,1)) +
        texture2D(tex,uv + step*vec2(1,-1)) +
        texture2D(tex,uv + step*vec2(-1,-1))
    ) / 4.;
}

void main() {
    vec2 uv = (uVar + 1.)/2.;
    vec3 tex = texture2D(s_InputTex, uv).rgb;
    // if (uCurrIter == uIterationCnt*2 - 1){
    //     // Final step.
    //     C = texture(s_OrigTex, uv)+ blur(uv, s_InputTex, 0.5)*uAmount;
    //     C.a = 1.;
    // } else if (uIsDownsampling){
    //     // Downsample step.
        // if (uCurrIter == 0)
        //     isThresholded = true;
        // C = blur(uv,s_InputTex,1.);
        // C.a = 1.;
    // } else if (uIsUpsampling){
    //     // Upsampling step.
    //     C = blur(uv,s_InputTex, 0.5);
    //     C.a = 1.;
    // }
    // C = ;

    // gl_FragColor = vec4(uv, 0., 1.);
    gl_FragColor = vec4(tex, 1.);
}