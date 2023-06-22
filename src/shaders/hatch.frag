#version 460

uniform sampler2D hatching0;
uniform sampler2D hatching1;
uniform sampler2D hatching2;
uniform sampler2D hatching3;
uniform sampler2D hatching4;
uniform sampler2D hatching5;
uniform sampler2D tex;


uniform vec3 lightPosition;

uniform mat4 m_view;
uniform vec4 l_dir;

in vec3 Normal;
in vec2 texCoord;




out vec4 outColor;


void main() {
    vec4 c;
    vec3 l = normalize(vec3(m_view * - l_dir));
    vec3 normal = normalize( Normal );
    
    float i = max(dot(l,normal), 0.0);
    
    vec3 n = normalize( Normal );


    vec4 tex0 = texture(hatching0,texCoord);
    vec4 tex1 = texture(hatching1,texCoord);
    vec4 tex2 = texture(hatching2,texCoord);
    vec4 tex3 = texture(hatching3,texCoord);
    vec4 tex4 = texture(hatching4,texCoord);
    vec4 tex5 = texture(hatching5,texCoord);


    float step = 1. / 6.;
    if( i <= step )
        c = mix( tex5, tex4, 6. * i );
    if( i > step && i <= 2. * step )
        c = mix( tex4, tex3, 6. * ( i - step ) );
    if( i > 2. * step && i <= 3. * step )
        c = mix( tex3, tex2, 6. * ( i - 2. * step ) );
    if( i > 3. * step && i <= 4. * step )
        c = mix( tex2, tex1, 6. * ( i - 3. * step ) );
    if( i > 4. * step && i <= 5. * step )
        c = mix( tex1, tex0, 6. * ( i - 4. * step ) );
    if( i > 5. * step )
        c = mix( tex0, vec4( 1. ), 6. * ( i - 5. * step ) );

    
    outColor = vec4( c.rgb, 1. );
}