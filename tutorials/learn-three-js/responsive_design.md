# Responsive design

Update style to expand to fullscreen of the browser

```
<style>
html, body {
    margin: 0;
    height: 100%;
}
#c {
    width: 100%;
    height: 100%;
    display: block;
}
</style>
```



Render loop update



`resizeRendererToDisplaySize()`

```
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
```


Update camera IF THE SCREEN IS RESIZED
```
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
```