# Orbital Controls

Links:
 - Docs: https://threejs.org/docs/?q=orbi#examples/en/controls/OrbitControls
 - Rendering on Demand: https://threejs.org/manual/#en/rendering-on-demand
 - Example: https://threejs.org/examples/#misc_controls_orbit
 - Example code: https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_orbit.html
 - Installation: https://threejs.org/manual/#en/installation
 - Fundamentals: https://threejs.org/manual/#en/fundamentals

Fundamentals says you need to add the add-on to the import map:

```
    <script type="importmap">
    {
      "imports": {
        "three": "./path/to/three.module.js",
        "three/addons/": "./different/path/to/examples/jsm/"
      }
    }
    </script>
```

But this doesn't seem necessary with Installation's NPM and Vite build tool I think...

