#version 330



// uniforms
uniform sampler2D tex;
uniform int width = 1000;
uniform int height = 1000;


// interpolated inputa
in vec2 texCoord;

// outputs
out vec4 colorOut;

//void main() {
//
//	// output texture color
//	colorOut = texture(tex, texCoord);
//}

// Sobel Edge Detection Filter
// GLSL Fragment Shader
// Implementation by Patrick Hebron

void main(void) 
{

// Avoid the background
    vec4 backgroundColor = vec4(0.0, 0.0, 0.0, 1.0); // Define your background color here
    float threshold = 0.2; // Adjust this threshold to define what is considered the background
  	vec2 texSize  = textureSize(tex, 0).xy;

  	//vec2 texCoord = gl_FragCoord.xy / texSize;

    vec4 currentColor = texture(tex, texCoord);
    float difference = length(currentColor - backgroundColor);


	vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
    if (difference < threshold)
    {
        // If the current pixel is considered part of the background, output the original color
        color = currentColor;
    }
    else
    {

  		int pixelSize = 9;

		//vec2 screenSize = vec2(width, height);

  		float x = int(gl_FragCoord.x) % pixelSize;
  		float y = int(gl_FragCoord.y) % pixelSize;

    	x = floor(pixelSize / 2.0) - x;
    	y = floor(pixelSize / 2.0) - y;

    	x = gl_FragCoord.x + x;
    	y = gl_FragCoord.y + y;

  		vec2 uv = vec2(x, y) / texSize;

		color = texture(tex, texCoord + uv);
		//vec2 newUV = floor(uv * screenSize / pixelSize) / screenSize * pixelSize;

  		//colorOut = texture(tex, uv);
    }



	colorOut = color;




	//colorOut = vec4( 1.0 - sobel.rgb, 1.0 );
}