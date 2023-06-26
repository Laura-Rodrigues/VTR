#version 330

uniform float near, far;
in vec4 pos;

out float depth;

void main(void) {
	depth = length(vec3(pos)) / (far-near);
}