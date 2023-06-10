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

	//vec3 edge1 = vec3(gl_in[1].gl_Position - gl_in[0].gl_Position);
	//vec3 edge2 = vec3(gl_in[2].gl_Position - gl_in[0].gl_Position);
	//vec3 edge3 = vec3(gl_in[4].gl_Position - gl_in[0].gl_Position);
	//vec3 edge4 = vec3(gl_in[5].gl_Position - gl_in[0].gl_Position);
	//vec3 edge5 = vec3(gl_in[4].gl_Position - gl_in[2].gl_Position);
	//vec3 edge6 = vec3(gl_in[3].gl_Position - gl_in[2].gl_Position);

	vec3 c = normalize(camPos - (ps[0]+ps[2]+ps[4])/3) ; 
	vec3 c2 = normalize(camPos - (ps[0]+ps[2]+ps[1])/3) ; 
	vec3 c4 = normalize(camPos - (ps[2]+ps[4]+ps[3])/3) ; 
	vec3 c6 = normalize(camPos - (ps[0]+ps[4]+ps[5])/3) ; 

	vec3 N042 = cross(ps[4] - ps[0], ps[2] - ps[0]);
	vec3 N021 = cross(ps[2] - ps[0], ps[1] - ps[0]);
	vec3 N243 = cross(ps[4] - ps[2], ps[3] - ps[2]);
	vec3 N405 = cross(ps[0] - ps[4], ps[5] - ps[4]);

	//if( dot( N042, N021 ) < 0. )
	//	N021 = vec3(0.,0.,0.) - N021;
	//if( dot( N042, N243 ) < 0. )
	//	N243 = vec3(0.,0.,0.) - N243;
	//if( dot( N042, N405 ) < 0. )
	//	N405 = vec3(0.,0.,0.) - N405;
	/*
	if( N042.z * N021.z <= 0. )
	{
		EmitLine(0,2);
	}
	if( N042.z * N243.z <= 0. )
	{
		EmitLine(2,4);
	}
	if( N042.z * N405.z <= 0. )
	{
		EmitLine(4,0);

	}
	*/
	float offset = 0.2;
	float dotView = dot(N042, c);
	if (dotView < 0.0){
		dotView = dot(N021, c2);
		if (dotView >= 0){
			EmitLine(0,2);
			// EmitPoint(0);
			// EmitPoint(2);
			// gl_Position = interpolation(0,4,offset) * M;
			// // normal = n[0];
    		// EmitVertex();
			// gl_Position = interpolation(2,4,offset) * M;
			// // normal = n[2];
    		// EmitVertex();

			// EndPrimitive();
		}
		dotView = dot(N243,c4);
		if (dotView >= 0){
			EmitLine(2,4);
			// EmitPoint(2);
			// EmitPoint(4);
			//  gl_Position = interpolation(2,0,offset) * M;
			// // normal = n[2];
    		// EmitVertex();
			// gl_Position = interpolation(4,0,offset) * M;
			// // normal = n[4];
    		// EmitVertex();
			// EndPrimitive();


		}
		dotView = dot(N405,c6);
		if (dotView >= 0){
			EmitLine(4,0);
			// EmitPoint(4);
			// EmitPoint(0);
			// gl_Position = interpolation(4,2,offset) * M;
			// // normal = n[4];
    		// EmitVertex();
			// gl_Position = interpolation(0,2,offset) * M;
			// // normal = n[0];
    		// EmitVertex();
			// EndPrimitive();



		}
	}
/*
	vec3 n = normalize(cross(edge1, edge2));
	vec3 n2 = normalize(cross(edge2, edge3));
	vec3 n4 = normalize(cross(edge3, edge4));
	vec3 n6 = normalize(cross(edge6, edge5));
//	n = normalize(normalMatrix * n2);

	if (dot(n2, ps[0]) < 0)
		return;
		
	vec4 p[3];
	p[0] = PVM * gl_in[0].gl_Position;
	p[1] = PVM * gl_in[2].gl_Position;
	p[2] = PVM * gl_in[4].gl_Position;

	vec4 q[3];
	q[0] = PVM * gl_in[1].gl_Position;
	q[1] = PVM * gl_in[3].gl_Position;
	q[2] = PVM * gl_in[5].gl_Position;

	float crease = 0.1;
 	if (
	dot(n2,n) < crease 
	|| gl_in[0].gl_Position == gl_in[1].gl_Position
	|| 
	dot(n, ps[0]) < 0
	) 
	{
			gl_Position = p[0];
			EmitVertex();
 
			gl_Position = p[1];
			EmitVertex();

			EndPrimitive();
	}
	if (
	dot(n2,n4) < crease 
	|| gl_in[4].gl_Position == gl_in[5].gl_Position 
	|| 
	dot(n4, ps[0]) < 0
	) 
	{
			gl_Position = p[0];
			EmitVertex();
 
			gl_Position = p[2];
			EmitVertex();

			EndPrimitive();
	}
	if (
	dot(n2,n6) < crease 
	|| gl_in[2].gl_Position == gl_in[3].gl_Position
	|| 
	dot(n6, ps[0]) < 0
	) 
	{
			gl_Position = p[1];
			EmitVertex();
 
			gl_Position = p[2];
			EmitVertex();

			EndPrimitive();
	}
 */
/*  	if (dot(cross(vec3(p[1] - p[0]), vec3(p[2] - p[0])), vec3(p[0])) > 0.0) 
	{
		// copy attributes
		if (
			gl_in[0].gl_Position == gl_in[1].gl_Position 
			|| 
			dot(cross(vec3(q[0] - p[0]), vec3(p[1] - p[0])), vec3(p[0])) < 0.0 
			||
			dot(n,n2) < 0.5
			) 
		{
			gl_Position = p[0];
			EmitVertex();
 
			gl_Position = p[1];
			EmitVertex();

			EndPrimitive();
		}

		if (
			gl_in[2].gl_Position == gl_in[3].gl_Position 
			|| 
			dot(cross(vec3(q[1] - p[1]), vec3(p[2] - p[1])), vec3(p[1])) < 0.0 
			||
			dot(n2,n6) < 0.5
			) 
		{
			gl_Position = p[1];
			EmitVertex();

			gl_Position = p[2];
			EmitVertex();

			EndPrimitive();
		}

		if (
			gl_in[4].gl_Position == gl_in[5].gl_Position 
			||
			dot(cross(vec3(p[2] - p[0]), vec3(q[2] - p[0])), vec3(p[2])) < 0.0 
			||
			dot(n2,n4) < 0.5
			)
		{
			gl_Position = p[2];
			EmitVertex();

			gl_Position = p[0];
			EmitVertex();

			EndPrimitive();
		}
	}
 */
 }
