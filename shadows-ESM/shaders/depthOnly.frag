#version 330

uniform float near, far;
in vec4 pos;

out float depth;

	// 1000.0 is an approximation to the max distance
	//depth = exp(k * length(vec3(pos))/1000.0);
void main(void) {
	depth = length(vec3(pos)) / (far-near);
}