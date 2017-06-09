// build the models
//createStone(10,10,10,[{x:5,y:5},{x:-5,y:-5},{x:-5,y:5},{x:5,y:-5}]);
// begin draw!
function normal_Stone(kind,basePoints){
    this.type = "obstacle";
    this.kind = kind;
    this.basePoints = basePoints;
    this.bottom_height;
    this.bottom_width;
    this.tall ;
}
normal_Stone.prototype.draw = function(basePoints) {
    // create color
    for(var inde_poi in this.basePoints){
        this.basePoints[inde_poi].x = parseInt(this.basePoints[inde_poi].x);
        this.basePoints[inde_poi].y = parseInt(this.basePoints[inde_poi].y);
    }
    var sides = getLowsAndHeights(this.basePoints);
    this.bottom_height = sides.heightX-sides.lowX;
    this.bottom_width = sides.heightY-sides.lowY;
    this.tall = 10;
    console.log("normal ball points " + this.basePoints);
    var stoneColor = [0xeea641,0xd89941,0xa58963];
    // add 10 random spheres
    var points = [];
    console.log("create nol");
    for(var base_index in this.basePoints){
        points.push(new THREE.Vector3(this.basePoints[base_index].x,this.basePoints[base_index].y, 0));
        points.push(new THREE.Vector3(this.basePoints[base_index].x,this.basePoints[base_index].y, this.tall));
    }
    // for (var i = 0; i < 16; i++) {
    //     var randomX = sides.lowX + Math.round(Math.random() * this.bottom_height);
    //     var randomZ = Math.round(Math.random() * this.tall)+this.tall/10;
    //     var randomY = sides.lowY + Math.round(Math.random() * this.bottom_width);

    //     points.push(new THREE.Vector3(randomX, randomY, randomZ));
    // }

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
    hullMesh = this.createMesh(hullGeometry,stoneColor[Math.floor(Math.random() * stoneColor.length + 1)-1],"blue");
    scene.add(hullMesh);
}
normal_Stone.prototype.createMesh = function(geom,color) {
    // var meshMaterial = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity:1 });
    var meshMaterial = new THREE.MeshPhongMaterial({color:color, shading:THREE.FlatShading});
    meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = false;

    // create a mesh
    var mesh = new THREE.Mesh(geom, meshMaterial);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
};