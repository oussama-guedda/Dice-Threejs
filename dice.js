var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000);
var scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0, 0);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );

/*const loader = new THREE.CubeTextureLoader();
loader.setPath( 'textures/' );
loader.load([
    '1.png', '2.png',
    '3.png', '4.png',
    '5.png', '6.png'
], function(textures) {
    const material = new THREE.MeshBasicMaterial( { envMap: textures } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    renderer.render(scene, camera);
});*/

const loader = new THREE.TextureLoader();
loader.load('textures/1.png', function(texture) {
    const material = new THREE.MeshBasicMaterial({
        map: texture,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
});

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
