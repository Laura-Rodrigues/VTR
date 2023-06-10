#version 460

uniform vec4 l_dir; // world space
uniform vec4 diffuse;
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
    //float rimLightIntensity = dot(e, n);
    //rimLightIntensity = 1.0 - rimLightIntensity;
    //rimLightIntensity = max(0.0, rimLightIntensity);
//
//    //rimLightIntensity = smoothstep(0.3, 0.4, rimLightIntensity);
//
    //vec4 rimLight   = rimLightIntensity * diffuse;

    int num_divisions = 3;
    float division = 1.0 / float(num_divisions);


    // floor to nearest division
    if      (i >= 0.8) { i = 1.0; }
    else if (i >= 0.6) { i = 0.6; }
    else if (i >= 0.3) { i = 0.3; }
    else    { i = 0.0; }
    color = i * diffuse;//+ rimLight;
}