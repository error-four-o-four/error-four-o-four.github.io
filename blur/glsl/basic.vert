#version 300 es

precision highp float;
precision highp int;

// vert file and comments from adam ferriss
// http://webglworkshop.com/38/Vertex-Shaders-Revisited.pdf
// https://github.com/aferriss/p5jsShaderExamples
// https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/basic_gradient_texcoord

// our vertex data
in vec3 aPosition;
in vec2 aTexCoord;
// attribute vec3 aPosition;
// attribute vec2 aTexCoord;

// uniform mat4 uModelViewMatrix;
// uniform mat4 uProjectionMatrix;
// uniform mat3 uNormalMatrix;

out vec2 vTexCoord;

void main() {
  // vec4 positionVec4 = vec4(aPosition, 1.0);
  // gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = positionVec4;
  vTexCoord = aTexCoord;
}