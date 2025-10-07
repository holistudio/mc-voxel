# Fundamentals

Link: https://threejs.org/manual/#en/optimize-lots-of-objects

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