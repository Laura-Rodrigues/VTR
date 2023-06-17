#version 460

uniform sampler2D hatching0;
uniform sampler2D hatching1;
uniform sampler2D hatching2;
uniform sampler2D hatching3;
uniform sampler2D hatching4;
uniform sampler2D hatching5;

uniform vec3 lightPosition;

uniform mat4 m_view;
uniform vec4 l_dir;



//in vec3 vPosition;
in vec3 Normal;
in vec2 texCoord;

//uniform float ambientWeight;
//uniform float diffuseWeight;

//uniform float specularWeight;
//uniform float shininess;


out vec4 outColor;


void main() {
    vec4 c;
    vec3 l = normalize(vec3(m_view * - l_dir));
    vec3 normal = normalize( Normal );
    
    float diffuse = max(dot(l,normal), 0.0);
    
    float specular = 0.;
    float ambient = 1.;
    vec3 n = normalize( Normal );
    //vec3 r = -reflect(lightPosition, n);
    //r = normalize(r);
    //vec3 v = -vPosition.xyz;
    //v = normalize(v);
//
    //float nDotHV = max( 0., dot( r, v ) );
    //if( nDotVP != 0. ) specular = pow ( nDotHV, shininess );

    

    //float shading = ambientWeight * ambient + diffuseWeight * diffuse;// + specularWeight * specular;
    float shading = diffuse;

    vec4 tex0 = texture(hatching0,texCoord);
    vec4 tex1 = texture(hatching1,texCoord);
    vec4 tex2 = texture(hatching2,texCoord);
    vec4 tex3 = texture(hatching3,texCoord);
    vec4 tex4 = texture(hatching4,texCoord);
    vec4 tex5 = texture(hatching5,texCoord);


    float step = 1. / 6.;
    if( shading <= step ){   
        c = mix( tex5, tex4, 6. * shading );
    }
    if( shading > step && shading <= 2. * step ){
        c = mix( tex4, tex3, 6. * ( shading - step ) );
    }
    if( shading > 2. * step && shading <= 3. * step ){
        c = mix( tex3, tex2, 6. * ( shading - 2. * step ) );
    }
    if( shading > 3. * step && shading <= 4. * step ){
        c = mix( tex2, tex1, 6. * ( shading - 3. * step ) );
    }
    if( shading > 4. * step && shading <= 5. * step ){
        c = mix( tex1, tex0, 6. * ( shading - 4. * step ) );
    }
    if( shading > 5. * step ){
        c = mix( tex0, vec4( 1. ), 6. * ( shading - 5. * step ) );
    }

    //vec4 src = mix( mix( inkColor, vec4( 1. ), c.r ), c, .5 );
    
    outColor = vec4( c.rgb, 1. );
}