#version 330

uniform sampler2D blurredExp;
uniform sampler2D texUnit;
uniform vec4 diffuse;
uniform vec4 lightDirection;
uniform int texCount;
uniform float k;
uniform float near, far;

in vec2 texCoordV;
in vec4 projShadowCoordV;
in vec3 normalV, lightDirV;
in vec4 posV, lightPosV;

out vec4 outColor;
/*
void make_kernel(inout vec4 n[9], sampler2D tex, vec2 coord)
{
	float w = 1.0 / textureSize(tex,0).x;
	float h = 1.0 / textureSize(tex,0).y;
	float depth0 = texture(tex, coord + vec2( -w, -h)).x;
	float depth1 = texture(tex, coord + vec2(0.0, -h)).x;
	float depth2 = texture(tex, coord + vec2(  w, -h)).x;
	float depth3 = texture(tex, coord + vec2( -w, 0.0)).x;
	float depth4 = texture(tex, coord).x;
	float depth5 = texture(tex, coord + vec2(  w, 0.0)).x;
	float depth6 = texture(tex, coord + vec2( -w, h)).x;
	float depth7 = texture(tex, coord + vec2(0.0, h)).x;
	float depth8 = texture(tex, coord + vec2(  w, h)).x;
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
	make_kernel( n, blurredExp, texCoordV);
	vec4 sobel_edge_h = n[2] + (2.0*n[5]) + n[8] - (n[0] + (2.0*n[3]) + n[6]);
  	vec4 sobel_edge_v = n[0] + (2.0*n[1]) + n[2] - (n[6] + (2.0*n[7]) + n[8]);
	vec4 sobel = sqrt((sobel_edge_h * sobel_edge_h) + (sobel_edge_v * sobel_edge_v));
	outColor = vec4(1- sobel.rgb,1.0 );
}
*/


void main()
{
	float shadowTerm=1;
	vec4 color, diff;

	if (texCount  != 2)
		diff = texture(texUnit, texCoordV) ;
	else 
		diff = diffuse;
		
	// ambient term = shadowed	
	color = diff * 0.25;
	
	vec3 n = normalize(normalV);
	
	float NdotL = max(0.0,dot (n, lightDirV));
	float expz = 0.0;

	vec4 exp_ = texture(blurredExp,texCoordV).rgba;
	if (NdotL > 0.0) {
		float lightDist = length(vec3(lightPosV - posV))/(far - near);
		vec4 proj = projShadowCoordV / projShadowCoordV.w; 
		//exp_ = texture(blurredExp, proj.xy).rgb;
		expz = texture(blurredExp, proj.xy).x;
		shadowTerm = exp(-k * (expz-lightDist) )  ;
		shadowTerm = clamp(shadowTerm, 0 , 1) ;
		color += diff  * NdotL * shadowTerm ;
	}
	
	outColor = texture(blurredExp,texCoordV);
	//outColor = texelFetch( blurredExp, ivec2(gl_FragCoord), 0 ).rgba;
}
