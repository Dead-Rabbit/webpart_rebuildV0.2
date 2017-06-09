function flatbase(){
	this.mesh;
    this.side_points = [];
    this.holes = [];
    this.height = 20;
    this.color = 0xb36d41;
}
flatbase.prototype.draw = function() {
/*****************************************************************************/
    // var testpush = [];
    // testpush.push({
    //     'x':0,
    //     'y':0
    // },{
    //     'x':800,
    //     'y':0
    // },{
    //     'x':800,
    //     'y':800
    // },{
    //     'x':0,
    //     'y':800
    // },{
    //     'x':0,
    //     'y':0
    // });
/*****************************************************************************/
    var options = {
        amount : this.height,
        bevelThickness : 0,
        bevelSize : 0.5,
        bevelSegments : 3,
        bevelEnabled : true,
        curveSegments : 5,
        steps : 1
    };

    var shape = this.createExMesh(new THREE.ExtrudeGeometry(this.getShape(), options));
	shape.position.z = -this.height;
    scene.add(shape);
};
flatbase.prototype.pushHole = function(hole) {
    this.holes.push(hole);
};
flatbase.prototype.getShape = function() {
    var shape = new THREE.Shape();

    for(var index_sidepoint in this.side_points){
        if(index_sidepoint==0){
            shape.moveTo(this.side_points[index_sidepoint].x, this.side_points[index_sidepoint].y);
            continue;
        }
        shape.lineTo(this.side_points[index_sidepoint].x, this.side_points[index_sidepoint].y);
        console.log("put " + this.side_points[index_sidepoint].x);
    }
    for(var index_holes in this.holes){
        console.log(this.holes[index_holes]);
        var hole = new THREE.Path();
        for(var index_hol_poi in this.holes[index_holes].points){
            this.holes[index_holes].points[index_hol_poi].x = parseInt(this.holes[index_holes].points[index_hol_poi].x);
            this.holes[index_holes].points[index_hol_poi].y = parseInt(this.holes[index_holes].points[index_hol_poi].y);
            if(index_holes==0) {
                hole.moveTo( this.holes[index_holes].points[index_hol_poi].x, this.holes[index_holes].points[index_hol_poi].y );
                continue;
            }
            hole.lineTo( this.holes[index_holes].points[index_hol_poi].x, this.holes[index_holes].points[index_hol_poi].y );
        }
        shape.holes.push(hole);
    }
    return shape;
};
flatbase.prototype.createMesh = function(geom) {
    var meshMaterial = new THREE.MeshPhongMaterial({color:this.color, shading:THREE.FlatShading});
    meshMaterial.side = THREE.DoubleSide;
    // create a multimaterial
    var mesh = new THREE.Mesh(geom, meshMaterial);
    return mesh;
};
flatbase.prototype.createExMesh = function(geom) {
    // geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

    var meshMaterial = new THREE.MeshLambertMaterial({color:this.color});

    // create a multimaterial
    var mesh = new THREE.Mesh(geom, meshMaterial);
    return mesh;
};
