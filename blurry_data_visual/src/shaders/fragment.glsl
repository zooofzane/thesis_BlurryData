precision mediump float;

// varying vec4 vposition;


// varying vec3 vColor;

void main()
{
    vec3 color = vec3(1.0, 1.0, 1.0);
    float dist = 0.;
    // dist = distance(vec3 vposition.xyz, vec3(0.5));
    // float trans = mix(0.,1.,dist);
    gl_FragColor = vec4(color, 1.0);
}