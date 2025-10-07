import * as THREE from 'three';

// Addons do not need to be installed separately, 
// but do need to be imported separately
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const controls = new OrbitControls( camera, renderer.domElement );
// const loader = new GLTFLoader();

// VOXEL CLASS
class VoxelWorld {
    constructor(cellSize) {
        this.cellSize = cellSize;
        this.cellSliceSize = cellSize * cellSize;
        this.cell = new Uint8Array(cellSize * cellSize * cellSize);
    }
    computeVoxelOffset(x, y, z) {
        const {cellSize, cellSliceSize} = this;
        const voxelX = THREE.MathUtils.euclideanModulo(x, cellSize) | 0;
        const voxelY = THREE.MathUtils.euclideanModulo(y, cellSize) | 0;
        const voxelZ = THREE.MathUtils.euclideanModulo(z, cellSize) | 0;
        const voxelOffset = voxelY * cellSliceSize +
                            voxelZ * cellSize +
                            voxelX;
        return voxelOffset;
    }
    getCellForVoxel(x, y, z) {
        const {cellSize} = this;
        const cellX = Math.floor(x / cellSize);
        const cellY = Math.floor(y / cellSize);
        const cellZ = Math.floor(z / cellSize);
        if (cellX !== 0 || cellY !== 0 || cellZ !== 0) {
            return null
        }
        return this.cell;
    }
    getVoxel(x, y, z) {
        // given x,y,z coordinate
        // identify the voxel that point is inside of
        const cell = this.getCellForVoxel(x, y, z);
        if (!cell) {
            return 0;
        }
        const voxelOffset = this.computeVoxelOffset(x, y, z);
        return cell[voxelOffset];
    }
    setVoxel(x, y, z, v) {
        const cell = this.getCellForVoxel(x, y, z);
        if (!cell) {
            return;  // TODO: add a new cell?
        }
        const voxelOffset = this.computeVoxelOffset(x, y, z);
        cell[voxelOffset] = v;
    }
    generateGeometryDataForCell(cellX, cellY, cellZ) {
        const {cellSize} = this;
        const positions = [];
        const normals = [];
        const indices = [];
        const startX = cellX * cellSize;
        const startY = cellY * cellSize;
        const startZ = cellZ * cellSize;

        // go from bottom of the world to the top
        for (let y = 0; y < cellSize; ++y) {
            const voxelY = startY + y;
            for (let z = 0; z < cellSize; ++z) {
                const voxelZ = startZ + z;
                for (let x = 0; x < cellSize; ++x) {
                    const voxelX = startX + z;
                    const voxel = this.getVoxel(voxelX, voxelY, voxelZ);
                    if (voxel) {
                        // check all faces
                        for (const {dir, corners} of VoxelWorld.faces) {
                            // check voxel in the corresponding direction of
                            // each face
                            const neighbor = this.getVoxel(
                                voxelX + dir[ 0 ],
                                voxelY + dir[1],
                                voxelZ + dir[2]);
                            if (!neighbor) {
                                // if there are no adjacent voxels
                                // the face is exposed and should be shown
                                const ndx = positions.length / 3; // TODO: ??
                                for (const pos of corners) {
                                    // push positions to list
                                    positions.push(pos[0] + x, pos[1] + y, pos[2] + z);
                                    normals.push(...dir); // TODO: ?? what's the ...?
                                }
                                indices.push(
                                    ndx, ndx + 1, ndx + 2,
                                    ndx + 2, ndx + 1, ndx + 3,
                                );
                            }
                        }
                    }
                }
            }
        }
        return {positions, normals, indices};
    }
}

VoxelWorld.faces = [
    { // left
        dir: [ -1,  0,  0, ],
        corners: [
        [ 0, 1, 0 ],
        [ 0, 0, 0 ],
        [ 0, 1, 1 ],
        [ 0, 0, 1 ],
        ],
    },
    { // right
        dir: [  1,  0,  0, ],
        corners: [
        [ 1, 1, 1 ],
        [ 1, 0, 1 ],
        [ 1, 1, 0 ],
        [ 1, 0, 0 ],
        ],
    },
    { // bottom
        dir: [  0, -1,  0, ],
        corners: [
        [ 1, 0, 1 ],
        [ 0, 0, 1 ],
        [ 1, 0, 0 ],
        [ 0, 0, 0 ],
        ],
    },
    { // top
        dir: [  0,  1,  0, ],
        corners: [
        [ 0, 1, 1 ],
        [ 1, 1, 1 ],
        [ 0, 1, 0 ],
        [ 1, 1, 0 ],
        ],
    },
    { // back
        dir: [  0,  0, -1, ],
        corners: [
        [ 1, 0, 0 ],
        [ 0, 0, 0 ],
        [ 1, 1, 0 ],
        [ 0, 1, 0 ],
        ],
    },
    { // front
        dir: [  0,  0,  1, ],
        corners: [
        [ 0, 0, 1 ],
        [ 1, 0, 1 ],
        [ 0, 1, 1 ],
        [ 1, 1, 1 ],
        ],
    },
];

function main() {
    const canvas = document.querySelector('#c');

    // VOXEL hyperparameter

    const cellSize = 32;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas})
    // renderer.setAnimationLoop( animate );
    // document.body.appendChild( renderer.domElement );


    // CAMERA
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // set position
    camera.position.set( - cellSize * .3, cellSize * .8, - cellSize * .3 );


    // ORBIT CONTROLS
    const controls = new OrbitControls( camera, renderer.domElement );
    // controls.enableDamping = true;
    controls.target.set( cellSize / 2, cellSize / 3, cellSize / 2 );
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

    
    
    const world = new VoxelWorld(cellSize);

    // create a hilly landscape

	for ( let y = 0; y < cellSize; ++ y ) {

		for ( let z = 0; z < cellSize; ++ z ) {

			for ( let x = 0; x < cellSize; ++ x ) {

				const height = ( Math.sin( x / cellSize * Math.PI * 2 ) + Math.sin( z / cellSize * Math.PI * 3 ) ) * ( cellSize / 6 ) + ( cellSize / 2 );
				if ( y < height ) {

					world.setVoxel( x, y, z, 1 );

				}

			}

		}

	}

    // geometry

    const {positions, normals, indices} = world.generateGeometryDataForCell(0, 0, 0);
    const geometry = new THREE.BufferGeometry();
    
    const positionNumComponents = 3;
    const normalNumComponents = 3;

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
    geometry.setIndex(indices);

    // material
    // const material = new THREE.MeshBasicMaterial({color: '#2bfba3'});
    // const material = new THREE.MeshPhongMaterial({color: '#2bfba3'});
    // const material = new THREE.MeshBasicMaterial({map: texture});
    const material = new THREE.MeshLambertMaterial({color: 'green'});

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
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


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