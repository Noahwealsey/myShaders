precision mediump float;
uniform float time; // time
uniform vec2  resolution; // resolution
uniform vec2 mouse;

void main(void){
	vec3 rColor = vec3(0.9, 0.0, 0.3);
	vec3 gColor = vec3(0.0, 0.9, 0.3);
	vec3 bColor = vec3(0.0, 0.3, 0.9);
  vec3 yColor = vec3(0.8, 0.8, 0.3);

  vec2 p = (gl_FragCoord.xy / resolution.xy)*2.0 - 1.0;

	float a = sin(p.y * 4.0 + time * 1.5) / 3.0;
	float b = sin(p.y * 4.0 + time * 2.8) / 3.0;
	float c = sin(p.y * 4.0 + time * 2.9) / 3.0;
  float d = sin(p.y * 4.0 + time * 3.2) / 3.0;


	float angle = 0.4*time;

	float e  = 0.012/ abs(p.x + d);
	float f = 0.012/ abs(p.x + a);
	float g = 0.012 / abs(p.x + b);
	float h = 0.012 / abs(p.x + c);

	vec3 destColor = rColor * f + gColor * g + bColor * h + e * yColor;

	float vignette = 1.0 - length(p);
	destColor *= vignette;

	gl_FragColor = vec4(destColor, 1.0);
}
