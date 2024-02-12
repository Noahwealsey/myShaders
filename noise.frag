precision mediump float;
uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;

const int   oct  = 9;
const float per  = 0.4;
const float PI   = 3.1415926;

float interpolate(float a, float b, float x){
      float t = (1. - cos(PI*x))*0.5;
      return a*(1. - t) + b*(t);
}

float rnd(vec2 p){
    return fract(sin(dot(p ,vec2(42.98,15.23))) * 43758.5453);
}

float irnd(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec4 v = vec4(rnd(vec2(i.x,       i.y      )),
                  rnd(vec2(i.x + 1.0, i.y      )),
                  rnd(vec2(i.x,       i.y + 1.0)),
                  rnd(vec2(i.x + 1.0, i.y + 1.0)));
    return interpolate(interpolate(v.x, v.y, f.x), interpolate(v.z, v.w, f.x), f.y);
}

float noise(vec2 p){
    float t =0.;
    for(int i = 0; i < oct; i++)
    {
      float freq = pow(2., float(i));
      float amp = pow(per, float(oct - i));
      t += irnd(vec2(p.x/freq, p.y/freq))*amp;
    }

    return t;

}

void main(){
    vec2 t = gl_FragCoord.xy + vec2(time*10.);
    float n = noise(t);
    gl_FragColor = vec4(vec3(n), 1.0);

}
