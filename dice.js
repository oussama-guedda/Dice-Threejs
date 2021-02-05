
var vA = new THREE.Vector3();
var vB = new THREE.Vector3();
var vC = new THREE.Vector3();
var t = new THREE.Triangle();

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
        gltf.scene.traverse( function( object ) {
			
            if ( object.isMesh ) console.log( computeArea( object ) );
        
        } );

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

document.body.addEventListener('click', function() {
    isInRotate = !isInRotate;
}, false);

camera.position.z = 10;

function generateFace() {
    return Math.round(Math.random()*6);
}

function computeArea( mesh ) {

	var geometry = mesh.geometry;
	var index = geometry.index;
	var position = geometry.attributes.position;
	
	var area = 0;
	
	if ( index ) {
	
		for ( var i = 0; i < index.count; i += 3 ) {
		
			var a = index.getX( i + 0 );
			var b = index.getX( i + 1 );
			var c = index.getX( i + 2 );
			
			vA.fromBufferAttribute( position, a );
			vB.fromBufferAttribute( position, b );
			vC.fromBufferAttribute( position, c );
			
			area += computeTriangleArea( vA, vB, vC );
		
		}
		
	} else {
	
		for ( var i = 0; i < position.count; i += 3 ) {
		
			vA.fromBufferAttribute( position, i + 0 );
			vB.fromBufferAttribute( position, i + 1 );
			vC.fromBufferAttribute( position, i + 2 );
			
			area += computeTriangleArea( vA, vB, vC );
		
		}
	
	}
	
	return area;

}

function computeTriangleArea( a, b, c ) {

	return t.set( a, b, c ).getArea();

}

generateFace();