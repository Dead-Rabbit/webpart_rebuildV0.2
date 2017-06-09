// [{x:5,y:5},{x:-5,y:-5},{x:-5,y:5},{x:5,y:-5}]

function plygon(points){
	this.id = '0';
	this.core ;
	this.nameMesh = new THREE.Mesh(	);
	this.tall = 5;
	this.points = points;
	this.color = 'red';

	this.position = new position(0,0,0);

	this.nextPoints = [];
	this.lastPoints = [];

	this.durningTimes = 12;
	this.usedTime = 0;
}
plygon.prototype.removeself = function() {
	scene.remove(this.core);
	scene.remove(this.nameMesh);
};
plygon.prototype.setId = function(id) {
	this.id = id;
};
plygon.prototype.getId = function() {
	return this.id;
};
plygon.prototype.doUpdate = function() {
    this.removeself();
    this.changePoints();
	this.draw_Plogin();

    this.synCenter();
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

    this.createText(this.id);

    scene.add(this.nameMesh);

    scene.add(this.core);
}

function create_plygon_Mesh(geom,color) {
    // geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

    var meshMaterial = new THREE.MeshLambertMaterial({color:color});

    // create a multimaterial
    var mesh = new THREE.Mesh(geom, meshMaterial);
    return mesh;
}
plygon.prototype.createText = function(content) {
    var options = {
        size: this.tall,
        height: 0,
        bevelThickness: 2,
        // font:'我字酷默陌写意水墨体',
        bevelSize: 0,
        bevelSegments: 3,
        bevelEnabled: false,
        curveSegments: 9,
        steps: 1
    };
    this.nameMesh = this.createTextMesh(new THREE.TextGeometry(content, options));
    this.nameMesh.position.x = this.position.x;
    this.nameMesh.position.y = this.position.y;
    this.nameMesh.position.z = this.tall*2;
};
plygon.prototype.createTextMesh = function(geom) {
// assign two materials
//            var meshMaterial = new THREE.MeshLambertMaterial({color: 0xff5555});
//            var meshMaterial = new THREE.MeshNormalMaterial();
    var meshMaterial = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        color: 0xeeffff,
        shininess: 100,
        metal: true
    });
//            meshMaterial.side=THREE.DoubleSide;
    // create a multimaterial
    var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);

    return plane;
};