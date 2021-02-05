var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000);
var scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0, 0);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );

var loader = new THREE.GLTFLoader();

var rotate = 0;

loader.load('model/dice.glb', function (gltf) {
        scene.add(gltf.scene);

        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.update();
        controls.minDistance = 2;
        controls.maxDistance = 30;

        function animate() {
            controls.update();

            gltf.scene.rotateX(rotate);
            gltf.scene.rotateY(rotate);
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        animate();
    },
    undefined,
    function (error) {
        console.error(error);
    });

document.body.addEventListener('click', function() {
    if(rotate !== 0) {
        rotate = 0;
    } else {
        rotate = .03;
    }
}, false);

camera.position.z = 10;

function generateFace() {
    return Math.round(Math.random()*6);
}

generateFace();