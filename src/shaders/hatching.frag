// Hatching - Fragment Shader
#version 330 core


in vec3 Normal;
in vec2 texCoord;
uniform mat4 m_view;
uniform sampler2D hatching6;// light
uniform sampler2D hatching0;
uniform sampler2D hatching1; 
uniform sampler2D hatching2;
uniform sampler2D hatching3;
uniform sampler2D hatching4;
uniform sampler2D hatching5; // dark

uniform sampler2D tex;

uniform vec4 l_dir;
//uniform vec3 camPos;

out vec4 outColor;
void main()
{
	vec3 normal = normalize(Normal);
	//vec3 l_dir = normalize(lightPos - FragPos);
	// if angle between normal and l_dir > 90 degrees, dot product is neg
    vec3 l = normalize(vec3(m_view * - l_dir));


	float diffuse = max(dot(l,normal), 0.0);

	ivec2 fragCoord = ivec2(gl_FragCoord.xy);
	while(fragCoord.x >= 256)
	{
		fragCoord.x -= 256;
	}
	while(fragCoord.y >= 256)
	{
		fragCoord.y -= 256;
	}





	// 6 texture lookups NOT ideal for performance -> change to Texture Array?
	float hatch6 = texelFetch( hatching6, fragCoord, 0 ).r;
	float hatch0 = texelFetch( hatching0, fragCoord, 0 ).r;
	float hatch1 = texelFetch( hatching1, fragCoord, 0 ).r;
	float hatch2 = texelFetch( hatching2, fragCoord, 0 ).r;
	float hatch3 = texelFetch( hatching3, fragCoord, 0 ).r;
	float hatch4 = texelFetch( hatching4, fragCoord, 0 ).r;
	float hatch5 = texelFetch( hatching5, fragCoord, 0 ).r;

    


	// weight math arithmetic from http://kylehalladay.com/blog/tutorial/2017/02/21/Pencil-Sketch-Effect.html
	float lightIntensity = dot(vec3(diffuse, diffuse, diffuse), vec3(0.2326, 0.7152, 0.0722)) * 7;
	vec3 lightIntensity3 = vec3(lightIntensity, lightIntensity, lightIntensity);
	vec3 weights0 = clamp(lightIntensity3 - vec3(0, 1, 2), 0.0, 1.0);
	vec3 weights1 = clamp(lightIntensity3 - vec3(3, 4, 5), 0.0, 1.0);
	vec3 weights2 = clamp(lightIntensity3 - vec3(6, 7, 8), 0.0, 1.0);

	weights0.xy -= weights0.yz;
	weights0.z -= weights1.x;
	weights1.xy -= weights1.yz;
	weights1.z -= weights2.x;
	weights2.xy -= weights2.yz;

	vec3 hatchingColor = vec3(0.0, 0.0, 0.0);
	hatchingColor += hatch5 * weights0.x;
	hatchingColor += hatch4 * weights0.y;
	hatchingColor += hatch3 * weights0.z;
	hatchingColor += hatch2 * weights1.x;
	hatchingColor += hatch1 * weights1.y;
	hatchingColor += hatch0 * weights1.z;
	hatchingColor += hatch6 * weights2.x;
	hatchingColor += hatch6 * weights2.y;
	hatchingColor += hatch6 * weights2.z;

	outColor = vec4(hatchingColor,1);
}