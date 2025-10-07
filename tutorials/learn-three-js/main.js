import * as THREE from 'three';

// Addons do not need to be installed separately, 
// but do need to be imported separately
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const controls = new OrbitControls( camera, renderer.domElement );
// const loader = new GLTFLoader();

function main() {
    const canvas = document.querySelector('#c');

    // RENDERER
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas})


    // CAMERA
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // set position
    camera.position.z = 2;


    // SCENE
    const scene = new THREE.Scene();

    // BOX MESH
    // geometry
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // material
    // const material = new THREE.MeshBasicMaterial({color: '#2bfba3'});
    const material = new THREE.MeshPhongMaterial({color: '#2bfba3'});

    // create the mesh
    const cube = new THREE.Mesh(geometry, material);

    // add to a scene
    scene.add(cube);


    // LIGHTS
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);


    // RENDER SCENE + CAMERA
    renderer.render(scene, camera);

    // ANIMATION (OPTIONAL)
    function render(time) {
      time *= 0.001;  // convert time to seconds
     
      cube.rotation.x = time;
      cube.rotation.y = time;
     
      renderer.render(scene, camera);
     
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();