
//createStone(7,7,20,[{x:5,y:5},{x:-5,y:-5},{x:-5,y:5},{x:5,y:-5},]);

function crystal_stone(kind,basePoints){
    this.type = "trap";
    this.kind = kind;
    this.basePoints = basePoints;
}
crystal_stone.prototype.draw = function(basePoints) {
    // create color
    for(var inde_poi in this.basePoints){
        this.basePoints[inde_poi].x = parseInt(this.basePoints[inde_poi].x);
        this.basePoints[inde_poi].y = parseInt(this.basePoints[inde_poi].y);
    }
    var sides = getLowsAndHeights(this.basePoints);
    var bottom_height = sides.heightX-sides.lowX;
    var bottom_width = sides.heightY-sides.lowY;
    var tall = 10;
    console.log(this.basePoints);
    var stoneColor = ["blue","red","green"];
    console.log("create cry");
    // add 10 random spheres
    var points = [];
    for(var base_index in this.basePoints){
        points.push(new THREE.Vector3(this.basePoints[base_index].x,this.basePoints[base_index].y, 0));
    }
    for (var i = 0; i < 16; i++) {
        var randomX = sides.lowX + Math.round(Math.random() * bottom_height);
        var randomZ = Math.round(Math.random() * tall);
        var randomY = sides.lowY + Math.round(Math.random() * bottom_width);

        points.push(new THREE.Vector3(randomX, randomY, randomZ));
    }
    // points.push(new THREE.Vector3(bottom_height/2-Math.random()*bottom_height/5, 0, bottom_width/2));
    // points.push(new THREE.Vector3(-bottom_height/2-Math.random()*bottom_height/5, 0, bottom_width/2));
    // points.push(new THREE.Vector3(bottom_height/2-Math.random()*bottom_height/5, 0, -bottom_width/2));
    // points.push(new THREE.Vector3(-bottom_height/2-Math.random()*bottom_height/5, 0, -bottom_width/2));

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
    hullMesh = this.createMesh(hullGeometry,stoneColor[Math.floor(Math.random() * stoneColor.length + 1)-1]);
    scene.add(hullMesh);
}
crystal_stone.prototype.createMesh = function(geom,color) {
    // assign two materials
    var meshMaterial = new THREE.MeshBasicMaterial({color: "blue", transparent: true, opacity: 0.7});
    meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    return mesh;
};