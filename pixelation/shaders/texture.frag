#version 330

// uniforms
uniform sampler2D tex;
uniform int width = 1000;
uniform int height = 1000;

// interpolated input
in vec2 texCoord;

// outputs
out vec4 colorOut;

void main(void) {

  	vec2 texSize  = textureSize(tex, 0).xy;
    vec4 currentColor = texture(tex, texCoord);

	vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
    
	int pixelSize = 9;

  	float x = int(gl_FragCoord.x) % pixelSize;
  	float y = int(gl_FragCoord.y) % pixelSize;

    x = floor(pixelSize / 2.0) - x;
    y = floor(pixelSize / 2.0) - y;

    x = gl_FragCoord.x + x;
    y = gl_FragCoord.y + y;

  	vec2 uv = vec2(x, y) / texSize;
	color = texture(tex, texCoord + uv);
	colorOut = color;

}