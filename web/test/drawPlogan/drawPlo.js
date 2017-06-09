// [{x:5,y:5},{x:-5,y:-5},{x:-5,y:5},{x:5,y:-5}]

function plygon(points){
	this.id = 0;
	this.core ;
	this.tall = 5;
	this.points = points;

	this.position = new position(0,0,0);

	this.nextPoints = [];
	this.lastPoints = [];

	this.durningTimes = 12;
	this.usedTime = 0;
}
plygon.prototype.setId = function(id) {
	this.id = id;
};
plygon.prototype.getId = function() {
	return this.id;
};
plygon.prototype.doUpdate = function() {
    this.remove_self();
    this.changePoints();
	this.draw_Plogin();

    this.synCenter();
};
plygon.prototype.remove_self = function() {
	scene.remove(this.core);
};
// 补间动画需计算
plygon.prototype.changePoints = function() {
	this.usedTime++;
	for(var index_po in this.nextPoints){
		this.points[index_po].x = (this.nextPoints[index_po].x-this.lastPoints[index_po].x)*this.usedTime/this.durningTimes+this.lastPoints[index_po].x;
		this.points[index_po].y = (this.nextPoints[index_po].y-this.lastPoints[index_po].y)*this.usedTime/this.durningTimes+this.lastPoints[index_po].y;
	}
	// if(this.usedTime==this.durningTimes) this.usedTime=0;
};
plygon.prototype.setNextPoints = function(points) {
	this.usedTime=0;
	this.lastPoints = this.nextPoints;
	for(var index_po in points){
		points[index_po].y = parseInt(points[index_po].y);
		points[index_po].x = parseInt(points[index_po].x);
	}
	this.nextPoints = points;
};
plygon.prototype.draw_Plogin = function() {
	this.draw(7,7,20,this.points);
}
plygon.prototype.synCenter = function() {
	var lowX=this.points[0].x,
	heightX=this.points[0].x,
	lowY=this.points[0].y,
	heightY=this.points[0].y;
	for(var index_poin in this.points){
		if(this.points[index_poin].x>heightX) heightX=this.points[index_poin].x;
		if(this.points[index_poin].x<lowX) lowX = this.points[index_poin].x;
		if(this.points[index_poin].y>heightY) heightY = this.points[index_poin].y;
		if(this.points[index_poin].y<lowY) lowY = this.points[index_poin].y;
	}
	this.position.x = (lowX+heightX)/2;
	this.position.y = (lowY+heightY)/2;
};
// begin draw!
plygon.prototype.draw = function(bottom_height,bottom_width,tall,basePoints) {
    // create color
    //,"red","green"
    var stoneColor = ["blue"];
    // add 10 random spheres
    var points = [];
    for(var points_index in this.points){
    	points.push(new THREE.Vector3(this.points[points_index].x,this.points[points_index].y,this.tall));
    	points.push(new THREE.Vector3(this.points[points_index].x,this.points[points_index].y,0));
    }
    var spGroup = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: false});
    points.forEach(function (point) {
        var spGeom = new THREE.SphereGeometry(0.2);
        var spMesh = new THREE.Mesh(spGeom, material);
        spMesh.position.copy(point);
        spGroup.add(spMesh);
    });
    // add the points as a group to the scene
    // scene.add(spGroup);

    // use the same points to create a convexgeometry
    var hullGeometry = new THREE.ConvexGeometry(points);
    hullMesh = create_plygon_Mesh(hullGeometry,stoneColor[Math.floor(Math.random() * stoneColor.length + 1)-1]);
    this.core = hullMesh;
    scene.add(this.core);
}

function create_plygon_Mesh(geom,color) {

    // assign two materials
    var meshMaterial = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.7});
    meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    return mesh;
}