# version 460

//uniorm
uniform mat4 PVM; 
uniform mat4 VM; 


//input streams - local space
in vec4 position;
uniform mat3 m_normal;
in vec3 normal;
in vec2 texCoord0;

//output
out vec3 Normal;
out vec3 e;
out vec2 texCoord;

void main(){
	texCoord = texCoord0;
    e = -vec3(VM * position);
    Normal = normalize(m_normal * normal);
    gl_Position = PVM * position;
}