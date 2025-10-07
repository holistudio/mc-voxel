# Rendering on Demand

Link: https://threejs.org/manual/#en/rendering-on-demand

```
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.update();
```

Simplify render() function
```
function render() {
    if ( resizeRendererToDisplaySize( renderer ) ) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    }
    
    renderer.render(scene, camera);
}
render();

controls.addEventListener('change', render);
window.addEventListener( 'resize', render );
```

`controls.addEventListener('change', render);`
 - OrbitControls dispatches a `change` event everytime something changes

`window.addEventListener( 'resize', render );`
 - for when the user changes the window size


`controls.enableDamping = true;` makes orbit controls animation smoother

But this needs a few things:
 - `OrbitControl` => new camera settings as camera movement smooths out
 - `controls.addEventListener('change')` cannot call `render()`
 - otherwise, `render()` will then call `control.update()` which calls `change`...infinite loop

So track if render is requested with

```
let renderRequested = false;

function requestRenderIfNotRequested() {
  if (!renderRequested) {
    renderRequested = true;
    requestAnimationFrame(render);
  }
}
```

NOTE: for w/e reason, I don't like this last part. `enableDamping` makes it feel less responsive to controls...