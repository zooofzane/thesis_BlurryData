import './style.css'
import * as THREE from 'three'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'
import {
    GUI
} from 'lil-gui';
import {
    FontLoader
} from 'three/examples/jsm/loaders/FontLoader.js';
import {
    TextGeometry
} from 'three/examples/jsm/geometries/TextGeometry.js';
import VertexShader from './shaders/vertex.glsl'
import FragmentShader from './shaders/fragment.glsl'
import {
    CinematicCamera
} from 'three/examples/jsm/cameras/CinematicCamera.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

let filterA = false;
// let btn = document.getElementById("filterA");
// btn.innerHTML = "filter";
// btn.onclick = function () {
//     filterA=!filterA;
//     console.log("filterA is " + filterA);
//   };









/* -------------------------------------------------------------------------- */
/*                                  load data                                 */
/* -------------------------------------------------------------------------- */
const data = require('./unkraine.json');
// console.log(data);


/* -------------------------------------------------------------------------- */
/*                              canvas and scene                              */
/* -------------------------------------------------------------------------- */
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000);
// scene.fog = new THREE.Fog(0xcc0000, 1, 1000);


/* -------------------------------- raycaster ------------------------------- */
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

/* --------------------------------- guides --------------------------------- */
// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

/* -------------------------------------------------------------------------- */
/*                                main function                               */
/* -------------------------------------------------------------------------- */
function init() {

    let geometry
    let material
    let rmaterial

    /* -------------------------------- geometry -------------------------------- */
    const loader = new FontLoader();
    geometry = new THREE.SphereGeometry(.001, 32, 32)

    /* -------------------------------- material -------------------------------- */
    rmaterial = new THREE.MeshBasicMaterial({
        color: 0xFF1313,
        // side: THREE.DoubleSide
    })

    material = new THREE.ShaderMaterial({
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        uniforms: {
            uTime: {
                value: 0
            },
            // uSize: { value: 30 * renderer.getPixelRatio() },
            uSize: {},
            // uValue: {},
        },
        vertexShader: VertexShader,
        fragmentShader: FragmentShader,
    })


    /* ----------------- map the time yy/mm/dd to absolute value ---------------- */
    let startYear = 1989;
    let endYear = 2020;
    let lowValue_time = startYear * 365;
    let highValue_time = (endYear + 1) * 365;
    let ageometry
    let textGeo;

    loader.load("https://threejs.org//examples/fonts/helvetiker_regular.typeface.json", function (tex) {
        textGeo = new TextGeometry("text", {
            size: 10.,
            height: 10.1,
            curveSegments: 25,
            font: tex,
            // bevelThickness: bevelThickness,
            // bevelSize: bevelSize,
            // bevelEnabled: bevelEnabled
        });
    });
    let aab = new THREE.Mesh(textGeo, material);
    aab.position.x = 1;
    aab.position.y = 1;
    aab.position.z = 1;
    console.log(aab);
    scene.add(aab);
    console.log(scene)

    // console.log(aab)
    let object;
    for (let i = 0; i < data.length; i++) {
        // console.log
        let timestringnumber = data[i].date_end.split(" ")[0].split("-");
        let timeAbsValue = timestringnumber[0] * 365 + timestringnumber[1] * 31 + timestringnumber[2] * 1;
        let latitude = data[i].latitude;
        let lontitude = data[i].longitude;








        object = new THREE.Mesh(geometry, material);

        let y_position = map_range(timeAbsValue, lowValue_time, highValue_time, 0, 5);
        let x_position = map_range(latitude, -180, 180, 0, 12) - 6;
        let z_position = map_range(lontitude, -180, 180, 0, 12) - 6;
        object.position.x = x_position;
        object.position.y = y_position;
        object.position.z = z_position;
        /* -------------------------------  details ------------------------------- */
        object.userData.conflict_name = data[i].conflict_name;
        object.userData.country = data[i].country;
        object.userData.geom_wkt = data[i].geom_wkt;
        object.userData.best = data[i].best;
        object.userData.side_a = data[i].side_a;
        object.userData.side_b = data[i].side_b;
        object.userData.deaths_a = data[i].deaths_a;
        object.userData.deaths_b = data[i].country;
        object.userData.deaths_civilians = data[i].deaths_civilians;
        object.userData.deaths_unknown = data[i].deaths_unknown;
        object.userData.source_article = data[i].source_article;
        object.userData.date_end = data[i].date_end;
        // object.userData.source_article = data[i].source_article;

       
 if(filterA == true){
    // object.remove();
    if (object.userData.deaths_a < 2){
        object.material = rmaterial;
    }
}

console.log(object.material)
object.position.y -= 1.
object.position.x += 2.
object.position.z += 2.

        scene.add(object);
      
    }
}

init();








/* ------------------------------ window resize ----------------------------- */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/* --------------------------------- camera --------------------------------- */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 4
camera.position.y = 4
camera.position.z = 4
// scene.add(new THREE.AmbientLight(0xffffff, 0.3));
scene.add(camera)

/* ---------------------------------- Stats --------------------------------- */
// let stats = new Stats();
// document.body.appendChild(stats.dom);

/* -------------------------------- Controls -------------------------------- */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/* -------------------------------- Renderer -------------------------------- */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(pointer, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {

        // intersects[i].object.material.color.set(0xff0000);
        // console.log(intersects[i].object.userData);
        // console.log(intersects[i].object);

        document.getElementById("conflict_name").innerHTML = "conflict_name:    " + "  " + intersects[i].object.userData.conflict_name;
        document.getElementById("country").innerHTML = "country:    " + "  " + intersects[i].object.userData.country;
        document.getElementById("geom_wkt").innerHTML = "geom_wkt:    " + "  " + intersects[i].object.userData.geom_wkt;
        document.getElementById("best").innerHTML = "Estimates of death:    " + "  " + intersects[i].object.userData.best;
        document.getElementById("side_a").innerHTML = "side_a:  " + "  " + intersects[i].object.userData.side_a;
        document.getElementById("side_b").innerHTML = "side_b:    " + "  " + intersects[i].object.userData.side_b;
        document.getElementById("deaths_a").innerHTML = "deaths_a:    " + "  " + intersects[i].object.userData.deaths_a;
        document.getElementById("deaths_b").innerHTML = "deaths_b:    " + "  " + intersects[i].object.userData.deaths_b;
        document.getElementById("deaths_civilians").innerHTML = "deaths_civilians:    " + "  " + intersects[i].object.userData.deaths_civilians;
        document.getElementById("deaths_unknown").innerHTML = "deaths_unknown:    " + "  " + intersects[i].object.userData.deaths_unknown;
        // document.getElementById("source_article").innerHTML = "source_article:    " + "  " + intersects[i].object.userData.source_article;
        // document.getElementById("date_end").innerHTML = "date_end:    " + "  " + intersects[i].object.userData.date_end;
    }

    // Update material
    // material.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // stats.update();

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    document.addEventListener('mousemove', onPointerMove);

    window.addEventListener('mousemove', onMouseMove, false);
}
tick()

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

}