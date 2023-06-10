#version 460

uniform vec4 l_dir; // world space
uniform vec4 diffuse;
uniform mat4 m_view;


//in vec3 eye;
//in vec3 normal;
out vec4 color; 



void main (){

    //vec3 e = normalize(eye);
    //vec3 n = normalize(normal);


    // vec3 l = normalize(vec3(m_view * - l_dir));

    // float i = max(0.0, dot(l,nn));   



    // if (i > 0.9) i = 0.9;
    // else if (i > 0.75) i = 0.75;
    // else if (i > 0.5) i = 0.5;
    // else i = 0.25;

    // //color = i * diffuse;
    color = vec4(1,0,0,1);
}