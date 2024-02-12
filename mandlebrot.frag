precision mediump float;
uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;

vec3 hsv(float h, float s, float v){
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

void main(void){

    vec2 m = vec2(mouse.x * 2.0 - 1.0, -mouse.y * 2.0 + 1.0)/ min(resolution.x, resolution.y);
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    float j = 0.;
    vec2  x = p + vec2(-0.5, 0.0);
    float y = 1. -m.x*1000.  ;
    vec2  z = vec2(-0.0 , -0.);;


    for(int i = 0; i <250; i++){
        j++;
        if(length(z) > 2.0){break;}
        z = vec2(z.x*z.x*z.x*z.x - 6.*z.x*z.x*z.y*z.y + z.y*z.y*z.y*z.y, 4.*z.x*z.x*z.x*z.y- 4.*z.x*z.y*z.y*z.y)  + x*y +0.5;
    }


    float h = mod(time *20., 500.0) / 500.0;
    vec3 rgb = hsv(h, 1.0, 1.0);


    float t = float(j) / 50.0;


    gl_FragColor = vec4(rgb * sin(t) , 1.);

}
