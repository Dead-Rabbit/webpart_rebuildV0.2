function stone(){
    this.position;
    this.core;
    this.geometry;
    this.meterial;
};
stone.prototype.setPosition = function(position) {
    this.position = position;
};
stone.prototype.draw = function(scene) {
	this.core = new THREE.Object3D();

	// Create the cabin
	var geomCockpit = new THREE.BoxGeometry(10,10,10,1,1,1);
	var matCockpit = new THREE.MeshPhongMaterial({color:Colors.blue, shading:THREE.FlatShading});
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;

	this.core.add(cockpit);
	this.core.position.x = 30;
	this.core.position.y = 30;
	this.core.position.z = 0;
    scene.add(this.core);
};
