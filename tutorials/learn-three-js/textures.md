# Textures

```
const loader = new THREE.TextureLoader();

function loadColorTexture(path) {
    const texture = loader.load(path);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}
```