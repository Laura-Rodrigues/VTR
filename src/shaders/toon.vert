# version 460

//uniorm
uniform mat4 PVM; 
uniform mat4 VM; 


//input streams - local space
in vec4 position;
uniform mat3 m_normal;
in vec3 normal;


//output
out vec3 n;
out vec3 e;
void main(){

    e = -vec3(VM * position);
    n = normalize(m_normal * normal);
    gl_Position = PVM * position;
}