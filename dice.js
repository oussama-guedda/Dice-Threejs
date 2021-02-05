var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000);
var scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0, 0);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );

var loader = new THREE.GLTFLoader();

var isInRotate = false;

loader.load('model/dice.glb', function (gltf) {
        scene.add(gltf.scene);

        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.update();
        controls.minDistance = 2;
        controls.maxDistance = 30;

        function animate() {
            controls.update();

            if(isInRotate) {
                gltf.scene.rotateX(Math.random()*0.05);
                gltf.scene.rotateY(Math.random()*0.05);
                gltf.scene.rotateZ(Math.random()*0.05);
            }

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
    isInRotate = !isInRotate;
}, false);

camera.position.z = 10;

function generateFace() {
    return Math.round(Math.random()*6);
}

generateFace();