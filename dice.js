var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000);
var scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0, 0);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );

/*const loadManager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(loadManager);

const materials = [
    new THREE.MeshBasicMaterial({map: loader.load('textures/1.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('textures/2.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('textures/3.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('textures/4.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('textures/5.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('textures/6.png')}),
];

loadManager.onLoad = () => {
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.minDistance = 2;
    controls.maxDistance = 30;

    function animate() {
        controls.update();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
};*/

var loader = new THREE.GLTFLoader();

loader.load('model/dice.glb', function (gltf) {
        scene.add(gltf.scene);

        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.update();
        controls.minDistance = 2;
        controls.maxDistance = 30;

        function animate() {
            controls.update();

            gltf.scene.rotateY(.05);
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        animate();
    },
    undefined,
    function (error) {
        console.error(error);
    });

camera.position.z = 10;