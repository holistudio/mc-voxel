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
    // renderer.setAnimationLoop( animate );
    // document.body.appendChild( renderer.domElement );


    // CAMERA
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // set position
    camera.position.z = 2;


    // ORBIT CONTROLS
    const controls = new OrbitControls( camera, renderer.domElement );
    // controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.update();


    // SCENE
    const scene = new THREE.Scene();


    // TEXTURE
    const loader = new THREE.TextureLoader();

    function loadColorTexture(path) {
        const texture = loader.load(path);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }

    


    // MESH / MODELS

    // geometry

    

    // material
    // const material = new THREE.MeshBasicMaterial({color: '#2bfba3'});
    // const material = new THREE.MeshPhongMaterial({color: '#2bfba3'});
    // const material = new THREE.MeshBasicMaterial({map: texture});

    const top_mat = new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/grass_top.png')})
    const side_mat = new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/grass_side.png')})
    const bot_mat = new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/grass_bottom.png')})
    const materials = [
         side_mat,
         side_mat,
         top_mat,
         bot_mat,
         side_mat,
         side_mat,
         
    ]

    // create the mesh


    // add to a scene



    // LIGHTS
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight( color );
	scene.add( ambientLight );


    // RESPONSIVE DESIGN

    function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const pixelRatio = window.devicePixelRatio;
		const width = Math.floor( canvas.clientWidth * pixelRatio );
		const height = Math.floor( canvas.clientHeight * pixelRatio );
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

    // RENDER SCENE + CAMERA
    renderer.render(scene, camera);


    // RENDER ON DEMAND
    // let renderRequested = false;
    function render() {
        // renderRequested = false;

        if ( resizeRendererToDisplaySize( renderer ) ) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
     
      renderer.render(scene, camera);
    }
    render();

    function requestRenderIfNotRequested() {
        if (!renderRequested) {
            renderRequested = true;
            requestAnimationFrame(render);
        }
    }
    controls.addEventListener('change', render);
    // controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener( 'resize', render );

}

main();