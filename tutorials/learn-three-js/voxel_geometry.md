# Voxel Geometry

Link: https://threejs.org/manual/#en/voxel-geometry

**Key: ignore faces that are adjacent to other faces**

Terminology:
 - `cell` is more like Minecraft chunk
 - `voxel` is each cube

So `getVoxel(35,0,0)` with `cellSize=32` means get `cell(1,0,0)` and look at `voxel(3,0,0)`


Define `VoxelWorld` class with a cell size

Add a function to make geometry for each cell
 - position
 - normal vector
 - index
 - uv texture map (optional)

Key Things
 - `VoxelWorld` figures out which positions, normals, and indices to render for each voxel
 - `THREE.BufferGeometry()` takes positions, normals, and indices and renders only the visible sides of each voxel via `THREE.BufferAttribute(...)`