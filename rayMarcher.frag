precision mediump float;
uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;

vec3 palette(float t) {
    return .2+.6*cos(1.28318*(t+vec3(.1,.916,.957)));
}

float smin( float d1, float d2, float k )
{
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h);
}

mat2 rot2D(float angle){


  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float sdSphere( vec3 p, float s )
{
  return length(p)-s;
}

float map(vec3 p, vec3 cam){

  p.z += time;
  p.xy = fract(p.xy) - 0.55;
  p.z =  mod(p.z, .25) - .1;
  float sphere = sdSphere(p, 0.16 );

  return sphere;
}
void main(){
  vec2 m = vec2(mouse.x * 2.0 - 1.0, -mouse.y * 2.0 + 1.0)/0.4;
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  vec3 camera = vec3(0., 0., -3);
  vec3 rayDir = normalize(vec3(uv, 1.));
  vec3 finalCol = vec3(0.);

  float totalDist  = 0.;

  // camera.xz *= rot2D(-m.x);
  // rayDir.xz *= rot2D(-m.x);
  //
  // camera.yz *= rot2D(-m.y);
  // rayDir.yz *= rot2D(-m.y);

  for(int i = 0; i < 80; i++){
      vec3 p = camera + rayDir*totalDist;

      p.xy *= rot2D(totalDist*0.4);

      float currentDist = map(p, camera);
      totalDist += currentDist;

      if(totalDist > 100. || currentDist < 0.01)break;
  }

  finalCol = palette(totalDist*0.04 );

  gl_FragColor = vec4(finalCol, 1.);

}
