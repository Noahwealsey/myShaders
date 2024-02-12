precision mediump float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}


void main(void) {
  float angle = time*0.07;
  vec2 normalizedCoord = (gl_FragCoord.xy / resolution.xy)*2.0 - 1.61 + mouse;

  for(float i = 0.0; i < 32.0; i++){
    normalizedCoord = abs(normalizedCoord);
    normalizedCoord -= 0.5 ;
    normalizedCoord *= 1.1;
    normalizedCoord *= mat2(
      cos(angle), -sin(angle),
      sin(angle), cos(angle)
      );


  }


  gl_FragColor = vec4(length( normalizedCoord), length( normalizedCoord + vec2(-0.1, -0.2)), length( normalizedCoord + vec2(0.2, -0.1)) , 1.0);
}
