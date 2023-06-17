#version 460



uniform mat4 m_view;
uniform vec4 l_dir;
uniform vec3 camPos;
uniform vec3 coolColor = vec3(0.0f, 0.0f, 0.8f);
uniform vec3 warmColor = vec3(0.4f, 0.4f, 0.0f);
uniform vec3 diffuse;
uniform vec3 lightColor;
uniform	vec4 specular;
uniform	float shininess;
uniform float alpha = 0.25;
uniform float beta = 0.5;




in vec3 n;
in vec3 e;

out vec4 outColor;

void main()
{

    vec3 objectColor = vec3(1, 1,1);
    vec3 ee = normalize(e);
	vec3 norm = normalize(n);

	// if angle between norm and lightDir > 90 degrees, dot product is neg
    vec3 l = normalize(vec3(m_view * - l_dir));
	float diff = max(dot(l,norm), 0.0);

	vec3 finalCool = coolColor + alpha * objectColor;
	vec3 finalWarm = warmColor + beta *  objectColor;

	float lerp = (1.0 + diff) / 2.0;

	finalCool = (1 - lerp) * finalCool;
	finalWarm = lerp * finalWarm;

	// specular
	//vec3 reflectDir = reflect(-l_dir, norm);
	//float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
	//vec3 specular = specularStrength * spec * lightColor;

    vec4 spec = vec4(0.0);


    float i = max(0.0, dot(l,norm));   

	if (i > 0.0) {
		// compute the half vector
		vec3 h = normalize(l + e);	
		// compute the specular intensity
		float intSpec = max(dot(h,norm), 0.0);
		// compute the specular term into spec
		spec = specular * pow(intSpec,shininess);
	}



	outColor = vec4(finalCool + finalWarm + vec3(spec), 1.0);
	//normalOut = vec4(Normal, 1.0);
	//depthOut = vec4(FragPos.z, FragPos.z, FragPos.z, 1.0);
}