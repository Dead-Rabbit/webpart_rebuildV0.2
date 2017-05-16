var loader, testMesh,texture;

function meshLoad(){
	loader = new THREE.JSONLoader()
	texture = THREE.ImageUtils.loadTexture("../assets/textures/general/bathroom.jpg");

	loader.load("../assets/models/ball/lightBall.js", function (geometry,  mat) {
	    var mat1 = new THREE.MeshPhongMaterial({
	        map: texture
	    });
	    testMesh = new THREE.Mesh(geometry,mat[0]);
	    console.log("finish load!");
	});
}
