#version 420
 
layout(triangles_adjacency) in;
layout (line_strip, max_vertices=4) out;

uniform	mat4 PVM;
uniform mat4 VM;
uniform mat4 M;
uniform mat4 VIM;

uniform vec3 camPos;



// Explore culling option

void EmitLine(int StartIndex, int EndIndex)
{
    gl_Position = gl_in[StartIndex].gl_Position * M ;

    EmitVertex();

    gl_Position = gl_in[EndIndex].gl_Position * M;

    EmitVertex();
    EndPrimitive();


}


void EmitPoint(int Index)
{
	gl_Position = gl_in[Index].gl_Position * M;
	// normal = n[Index];
	EmitVertex();
}

vec4 interpolation(int p0, int p1, float t){
	return (1-t)*gl_in[p0].gl_Position + t*gl_in[p1].gl_Position;
}


 void main()
{
	vec3 ps[6];
	
	for (int i = 0; i < 6; ++i)
		ps[i] = vec3(gl_in[i].gl_Position * PVM);

	vec3 c = normalize(camPos - (ps[0]+ps[2]+ps[4])/3) ; 
	vec3 c2 = normalize(camPos - (ps[0]+ps[2]+ps[1])/3) ; 
	vec3 c4 = normalize(camPos - (ps[2]+ps[4]+ps[3])/3) ; 
	vec3 c6 = normalize(camPos - (ps[0]+ps[4]+ps[5])/3) ; 

	vec3 N042 = cross(ps[4] - ps[0], ps[2] - ps[0]);
	vec3 N021 = cross(ps[2] - ps[0], ps[1] - ps[0]);
	vec3 N243 = cross(ps[4] - ps[2], ps[3] - ps[2]);
	vec3 N405 = cross(ps[0] - ps[4], ps[5] - ps[4]);

	float offset = 0.2;
	float dotView = dot(N042, c);
	if (dotView < 0.0){
		dotView = dot(N021, c2);
		if (dotView >= 0){
			EmitLine(0,2);
		}
		dotView = dot(N243,c4);
		if (dotView >= 0){
			EmitLine(2,4);
		}
		dotView = dot(N405,c6);
		if (dotView >= 0){
			EmitLine(4,0);
		}
	}

 }
