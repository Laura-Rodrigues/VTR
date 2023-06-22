#version 330

uniform sampler2D moments;

in vec2 texCoordV;


out vec4 color;
void make_kernel(inout vec4 n[9], sampler2D tex, vec2 coord)
{
	float w = 1.0 / textureSize(moments,0).x;
	float h = 1.0 / textureSize(moments,0).y;
	float depth0 = texture(moments, coord + vec2( -w, -h)).x;
	float depth1 = texture(moments, coord + vec2(0.0, -h)).x;
	float depth2 = texture(moments, coord + vec2(  w, -h)).x;
	float depth3 = texture(moments, coord + vec2( -w, 0.0)).x;
	float depth4 = texture(moments, coord).x;
	float depth5 = texture(moments, coord + vec2(  w, 0.0)).x;
	float depth6 = texture(moments, coord + vec2( -w, h)).x;
	float depth7 = texture(moments, coord + vec2(0.0, h)).x;
	float depth8 = texture(moments, coord + vec2(  w, h)).x;
	n[0] = vec4(depth0,depth0,depth0,1.0);
	n[1] = vec4(depth1,depth1,depth1,1.0);
	n[2] = vec4(depth2,depth2,depth2,1.0);
	n[3] = vec4(depth3,depth3,depth3,1.0);
	n[4] = vec4(depth4,depth4,depth4,1.0);
	n[5] = vec4(depth5,depth5,depth5,1.0);
	n[6] = vec4(depth6,depth6,depth6,1.0);
	n[7] = vec4(depth7,depth7,depth7,1.0);
	n[8] = vec4(depth8,depth8,depth8,1.0);

}

void main(void) 
{
	vec4 n[9];
	make_kernel( n, moments, texCoordV);
	vec4 sobel_edge_h = n[2] + (2.0*n[5]) + n[8] - (n[0] + (2.0*n[3]) + n[6]);
  	vec4 sobel_edge_v = n[0] + (2.0*n[1]) + n[2] - (n[6] + (2.0*n[7]) + n[8]);
	vec4 sobel = sqrt((sobel_edge_h * sobel_edge_h) + (sobel_edge_v * sobel_edge_v));
	color = vec4(1- sobel.rgb,1.0 );
}