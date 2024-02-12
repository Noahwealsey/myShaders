precision mediump float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float sdfCircle(vec2 pos, float radius){
    return length(pos) - radius;


}
void main() {
  vec2 uv  = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
  uv = uv * resolution / 100.0;
  float radius = (1.5);

  vec2 center = vec2(0.0, 0.0);
  vec3 green = vec3(0., 1., 0.);
  vec3 blue = vec3(0.65, 0.85, 1.);
  vec3 orange = vec3(0.9, 0.6, 0.3);
  vec3 black = vec3(0.);

  // Update the center based on time for movement
  center = vec2(0., 0.);

  float distToCircle = sdfCircle(uv - center, radius);
  vec3 color = distToCircle > 0.0 ? orange : blue;

  color = color - (1. - exp(-0.2*abs(distToCircle)));
  color = color*1.0 + color*0.2*sin(100.*distToCircle + 10.*time);
  color = mix(black , color, smoothstep(0. , 0.07, abs(distToCircle)));


  gl_FragColor = vec4(color, 1.0);
}
