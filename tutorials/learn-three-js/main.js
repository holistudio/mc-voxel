import * as THREE from 'three';

// Addons do not need to be installed separately, 
// but do need to be imported separately
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

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
}