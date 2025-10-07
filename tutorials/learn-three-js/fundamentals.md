# Fundamentals

Link: https://threejs.org/manual/#en/fundamentals

three.js uses WebGL to draw 3D
 - three.js handles stuff so you don't have to deal with WebGL directly

Big pieces:
 
 1. `Scene`: passed to the `Renderer`
     - A `scenegraph` defines the scene's hierarchy
 2. `Camera`: sorta part of the scenegraph sorta not
 3. `Renderer`: draws whatever is in the `Scene` that is inside the frustum of the `Camera`
 4. `Mesh` objects consist of  `Geometry` and `Material`
 5. `Material` can reference `Texture`
 6. `Light` make things visible

HTML needs:
  - `<script type="module"> ... </script>`
  - `<canvas id="c"></canvas>` inside `<body>`

Javascript needs:

```
function main() {...}

main();
```
 - NEED TO RUN THE FUNCTION DUHHHH
 
Typical localhost: http://localhost:5173

## Camera

Camera parameters
 - FOV
 - aspect ratio
 - near and far plane

**NOTE:** this tutorial intends the camera to look down **-Z direction** with **+X direction** pointing to camera right

## Scene

 1. Create the scene `new THREE.Scene()`
 2. Specify a geometry
 3. Specify a material
 4. Create a mesh with geometry and material
 5. Add mesh to scene
 6. Render the scene to a camera