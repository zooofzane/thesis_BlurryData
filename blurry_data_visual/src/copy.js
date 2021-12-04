import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'
import { GUI } from 'lil-gui';
// // import galaxyVertexShader from './shaders/galaxy/vertex.glsl'
// // import galaxyFragmentShader from './shaders/galaxy/fragment.glsl'




import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

			// let camera, scene, raycaster, renderer, stats;

			// const mouse = new THREE.Vector2();
			// let INTERSECTED;
			// const radius = 100;
			// let theta = 0;

			// init();
			// animate();

			// function init() {

			// 	camera = new CinematicCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
			// 	camera.setLens( 5 );
			// 	camera.position.set( 2, 1, 500 );

			// 	scene = new THREE.Scene();
			// 	scene.background = new THREE.Color( 0xf0f0f0 );

			// 	scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );

			// 	const light = new THREE.DirectionalLight( 0xffffff, 0.35 );
			// 	light.position.set( 1, 1, 1 ).normalize();
			// 	scene.add( light );

			// 	const geometry = new THREE.BoxGeometry( 20, 20, 20 );

			// 	for ( let i = 0; i < 1500; i ++ ) {

			// 		const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

			// 		object.position.x = Math.random() * 800 - 400;
			// 		object.position.y = Math.random() * 800 - 400;
			// 		object.position.z = Math.random() * 800 - 400;

			// 		scene.add( object );

			// 	}

			// 	raycaster = new THREE.Raycaster();

			// 	renderer = new THREE.WebGLRenderer( { antialias: true } );
			// 	renderer.setPixelRatio( window.devicePixelRatio );
			// 	renderer.setSize( window.innerWidth, window.innerHeight );
			// 	document.body.appendChild( renderer.domElement );

			// 	stats = new Stats();
			// 	document.body.appendChild( stats.dom );

			// 	document.addEventListener( 'mousemove', onDocumentMouseMove );

			// 	window.addEventListener( 'resize', onWindowResize );

			// 	const effectController = {

			// 		focalLength: 15,
			// 		// jsDepthCalculation: true,
			// 		// shaderFocus: false,
			// 		//
			// 		fstop: 2.8,
			// 		// maxblur: 1.0,
			// 		//
			// 		showFocus: false,
			// 		focalDepth: 3,
			// 		// manualdof: false,
			// 		// vignetting: false,
			// 		// depthblur: false,
			// 		//
			// 		// threshold: 0.5,
			// 		// gain: 2.0,
			// 		// bias: 0.5,
			// 		// fringe: 0.7,
			// 		//
			// 		// focalLength: 35,
			// 		// noise: true,
			// 		// pentagon: false,
			// 		//
			// 		// dithering: 0.0001

			// 	};

			// 	const matChanger = function ( ) {

			// 		for ( const e in effectController ) {

			// 			if ( e in camera.postprocessing.bokeh_uniforms ) {

			// 				camera.postprocessing.bokeh_uniforms[ e ].value = effectController[ e ];

			// 			}

			// 		}

			// 		camera.postprocessing.bokeh_uniforms[ 'znear' ].value = camera.near;
			// 		camera.postprocessing.bokeh_uniforms[ 'zfar' ].value = camera.far;
			// 		camera.setLens( effectController.focalLength, camera.frameHeight, effectController.fstop, camera.coc );
			// 		effectController[ 'focalDepth' ] = camera.postprocessing.bokeh_uniforms[ 'focalDepth' ].value;

			// 	};

			// 	//

			// 	const gui = new GUI();

			// 	gui.add( effectController, 'focalLength', 1, 135, 0.01 ).onChange( matChanger );
			// 	gui.add( effectController, 'fstop', 1.8, 22, 0.01 ).onChange( matChanger );
			// 	gui.add( effectController, 'focalDepth', 0.1, 100, 0.001 ).onChange( matChanger );
			// 	gui.add( effectController, 'showFocus', true ).onChange( matChanger );

			// 	matChanger();

			// 	window.addEventListener( 'resize', onWindowResize );

			// }

			// function onWindowResize() {

			// 	camera.aspect = window.innerWidth / window.innerHeight;
			// 	camera.updateProjectionMatrix();

			// 	renderer.setSize( window.innerWidth, window.innerHeight );

			// }

			// function onDocumentMouseMove( event ) {

			// 	event.preventDefault();

			// 	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			// }

			// function animate() {

			// 	requestAnimationFrame( animate, renderer.domElement );

			// 	render();
			// 	stats.update();

			// }


			// function render() {

			// 	// theta += 0.1;

			// 	camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
			// 	camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
			// 	camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
			// 	camera.lookAt( scene.position );

			// 	camera.updateMatrixWorld();

			// 	// find intersections

			// 	raycaster.setFromCamera( mouse, camera );

			// 	const intersects = raycaster.intersectObjects( scene.children, false );

			// 	if ( intersects.length > 0 ) {

			// 		const targetDistance = intersects[ 0 ].distance;

			// 		camera.focusAt( targetDistance ); // using Cinematic camera focusAt method

			// 		if ( INTERSECTED != intersects[ 0 ].object ) {

			// 			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

			// 			INTERSECTED = intersects[ 0 ].object;
			// 			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			// 			INTERSECTED.material.emissive.setHex( 0xff0000 );

			// 		}

			// 	} else {

			// 		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

			// 		INTERSECTED = null;

			// 	}

			// 	//

			// 	if ( camera.postprocessing.enabled ) {

			// 		camera.renderCinematic( scene, renderer );

			// 	} else {

			// 		scene.overrideMaterial = null;

			// 		renderer.clear();
			// 		renderer.render( scene, camera );

			// 	}

			// }






























const data = require('./csvjson.json');
console.log(data);

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff);

function init(){
// Canvas


// Scene


/**
 * Galaxy
 */
// const parameters = {}
// parameters.count = 10
// parameters.size = 0.005
// parameters.radius = 5
// parameters.branches = 20
// parameters.spin = 1
// parameters.randomness = 0.6
// parameters.randomnessPower = 1
// parameters.insideColor = '#ffffff'
// parameters.outsideColor = '#ffffff'

// let geometry = null
// let material = null
// let points = null
// let mesh

let geometry
let material 
let points
let mesh

// const generateGalaxy = () => {
//     if (points !== null) {
//         geometry.dispose()
//         material.dispose()
//         scene.remove(points)
//     }

    /**
     * Geometry
     */
    // geometry = new THREE.BufferGeometry()


    // const positions = new Float32Array(parameters.count * 3)
    // const randomness = new Float32Array(parameters.count * 3)
    // const colors = new Float32Array(parameters.count * 3)
    // const scales = new Float32Array(parameters.count * 1)

    // const insideColor = new THREE.Color(parameters.insideColor)
    // const outsideColor = new THREE.Color(parameters.outsideColor)

    // for(let i = 0; i < parameters.count; i++)
    // {
    //     const i3 = i * 3

    //     // Position
    //     const radius = Math.random() * parameters.radius

    //     const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

    //     const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
    //     const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
    //     const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius

    //     positions[i3    ] = 0
    //     positions[i3 + 1] = 0
    //     positions[i3 + 2] = Math.sin(branchAngle) * radius

    //     randomness[i3    ] = randomX
    //     randomness[i3 + 1] = randomY
    //     randomness[i3 + 2] = randomZ

    //     // Color
    //     const mixedColor = insideColor.clone()
    //     mixedColor.lerp(outsideColor, radius / parameters.radius)

    //     colors[i3    ] = mixedColor.r
    //     colors[i3 + 1] = mixedColor.g
    //     colors[i3 + 2] = mixedColor.b

    //     // Scale
    //     scales[i] = Math.random()
    // }

    // geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    // geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
    // geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    // geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

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

    /**
     * Points
     */






    // scene.add(mesh)
// }

geometry = new THREE.SphereGeometry(.01, 32,32)
// geometry = new THREE.TorusKnotGeometry( 1, 0.3, 128, 64 )
material = new THREE.MeshStandardMaterial()

for (let i = 0; i < 1500; i++) {

    const object = new THREE.Mesh(geometry, material);

    object.position.x = Math.random()*4-2 ;
    object.position.y = Math.random()*4-2 ;
    object.position.z = Math.random() *4-2;

    scene.add(object);

}


}

init();



// gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
// gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
// gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
// gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
// gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
// gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
// gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

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