import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'
import { GUI } from 'lil-gui';
// // import galaxyVertexShader from './shaders/galaxy/vertex.glsl'
// // import galaxyFragmentShader from './shaders/galaxy/fragment.glsl'

import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';


const data = require('./csvjson.json');
console.log(data);
console.log(data[0].date_end);

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff);

function init(){

let geometry
let material 
 
    /**
     * Material
     */
    // material = new THREE.ShaderMaterial({
    //     depthWrite: false,
    //     blending: THREE.AdditiveBlending,
    //     vertexColors: true,
    //     uniforms:
    //     {
    //         uTime: { value: 0 },
    //         uSize: { value: 30 * renderer.getPixelRatio() }
    //     },    
    //     vertexShader: galaxyVertexShader,
    //     fragmentShader: galaxyFragmentShader
    // })


geometry = new THREE.SphereGeometry(.01, 32,32)
material = new THREE.MeshStandardMaterial()

for (let i = 0; i < 1548; i++) {

    const object = new THREE.Mesh(geometry, material);

    object.position.x = Math.random()*4-2 ;
    object.position.y = Math.random()*4-2 ;
    object.position.z = Math.random() *4-2;

    scene.add(object);

}


}

init();

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );
// function cam(){
    scene.add(camera)
// }
// cam()

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Generate the first galaxy
 */
// generateGalaxy()

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update material
    // material.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()