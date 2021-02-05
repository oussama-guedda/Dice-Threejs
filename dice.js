var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000);
var scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0, 0);

var loader = new THREE.GLTFLoader();
var isInRotate = false;
var gltfObject;

loader.load('model/dice.glb', function (gltf) {
        gltfObject = gltf;
        scene.add(gltf.scene);
        gltf.scene.position.y = 1;

        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.update();
        controls.minDistance = 2;
        controls.maxDistance = 30;

        function animate() {
            controls.update();

            if(isInRotate) {
                gltf.scene.rotateX(Math.random()*0.06);
                gltf.scene.rotateY(Math.random()*0.06);
                gltf.scene.rotateZ(Math.random()*0.06);
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

document.body.addEventListener('dblclick', function() {
    resetPositions(gltfObject.scene);
    var randomFace = generateFace();
    var facesCoords = getFacesCoords(randomFace);
    var faceElement = document.getElementById("face");

    isInRotate = true;

    window.setTimeout(function() {
        isInRotate = false;
        setDicePosition(gltfObject.scene, facesCoords.rotatationX, facesCoords.rotationY, facesCoords.rotationZ);
        faceElement.innerHTML = "Face : " + randomFace.toString();
    }, 3000);
}, false);

camera.position.x = 8;
camera.position.y = 7;
camera.position.z = 1;

function getFacesCoords(face) {
    var facesCoords = [
        {
            face: 1,
            rotatationX: 0.0,
            rotationY: 0.0,
            rotationZ: 0.0
        },
        {
            face: 2,
            rotatationX: 0.0,
            rotationY: 0.0,
            rotationZ: 1.5
        },
        {
            face: 3,
            rotatationX: 0.0,
            rotationY: 0.0,
            rotationZ: -1.6
        },
        {
            face: 4,
            rotatationX: -1.6,
            rotationY: 0.0,
            rotationZ: -1.6
        },
        {
            face: 5,
            rotatationX: 1.6,
            rotationY: 1.5,
            rotationZ: 1.5
        },
        {
            face: 6,
            rotatationX: 1.7,
            rotationY: 0.0,
            rotationZ: 0.0
        }
    ];

    for(var i in facesCoords) {
        if(facesCoords[i].face === face) {
            return facesCoords[i];
        }
    }

    return undefined;
}

function setDicePosition(object, rotationX, rotationY, rotationZ) {
    object.rotation.x = rotationX;
    object.rotation.y = rotationY;
    object.rotation.z = rotationZ;
}

function resetPositions(object) {
    object.rotation.x = 0;
    object.rotation.y = 0;
    object.rotation.z = 0;
}

function addFloor() {
    var floorMaterial = new THREE.MeshPhongMaterial({
        color: "#00aa00",
        side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.PlaneGeometry(30, 30, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
}

addFloor();

function generateFace() {
    return Math.round(Math.random()*6);
}
