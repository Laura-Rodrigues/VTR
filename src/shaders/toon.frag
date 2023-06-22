#version 460

uniform vec4 l_dir; // world space
uniform vec4 diffuse;
uniform	vec4 specular;
uniform	float shininess;
uniform mat4 m_view;
uniform int num_divisions;

//uniform
in vec3 n;
in vec3 e;
out vec4 color; 

void main (){


    vec3 nn = normalize(n);
    vec3 ee = normalize(e);

    vec3 l = normalize(vec3(m_view * - l_dir));

    float i = max(0.0, dot(l,nn));   
    float rimLightIntensity = dot(ee, n);
    rimLightIntensity = 1.0 - rimLightIntensity;
    rimLightIntensity = max(0.0, rimLightIntensity);

    rimLightIntensity = smoothstep(0.7, 0.8, rimLightIntensity);
    vec4 rimLight   = rimLightIntensity * vec4(1.0, 0, 0, 1.0);


	
    vec4 spec = vec4(0.0);

	if (i > 0.0) {
		// compute the half vector
		vec3 h = normalize(l + ee);	
		// compute the specular intensity
		float intSpec = max(dot(h,n), 0.0);
		// compute the specular term into spec
		spec = specular * pow(intSpec,shininess);
	}

    float division = 1.0 / float(num_divisions);
    i = ceil((i +0.00001) * num_divisions) * division;


    // floor to nearest division
    //if      (i >= 0.8) { i = 1.0; }
    //else if (i >= 0.6) { i = 0.6; }
    //else if (i >= 0.3) { i = 0.3; }
    //else    { i = 0.0; }
    color = i * diffuse + rimLight + spec;
}