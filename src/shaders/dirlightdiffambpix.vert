#version 420
uniform mat4 VM;
uniform mat4 PVM;
uniform mat4 M;
uniform mat3 m_normal;
uniform mat4 m_view;
uniform vec4 l_dir;
in vec4 position;
in vec3 normal;

//output
out vec3 n;
out vec3 e;


void main()
{
	n = normalize(m_normal * normal);
	e = -vec3(m_view * position);
	gl_Position =PVM *  position; 
}