/*
作为基础物体的绘制的基类
 */
function drawBase(){
    this.position;
    this.core;
    this.geometry;
    this.meterial;
};
drawBase.prototype.setPosition = function(position) {
    this.position = position;
};
drawBase.prototype.getCore = function() {
    return this.core;
};
drawBase.prototype.getPosition = function(){
    return this.position;
};

//传入已经定义的模型
drawBase.prototype.createCustomMesh = function(mesh,texture,radius) {
    var mineMesh = mesh;
    mineMesh.scale.x = radius;
    mineMesh.scale.y = radius;
    mineMesh.scale.z = radius;
    return mineMesh;
};
drawBase.prototype.createTextureMesh = function( imageFile, normal) {
    var geom = new THREE.SphereGeometry(this.radius, 40, 40);
    if (normal) {
        var t = THREE.ImageUtils.loadTexture("../assets/textures/general/" + imageFile);
        var m = THREE.ImageUtils.loadTexture("../assets/textures/general/" + normal);
        var mat2 = new THREE.MeshPhongMaterial();
        mat2.map = t;
        mat2.normalMap = m;

        var mesh = new THREE.Mesh(geom, mat2);
        return mesh;
    } else {
        var t = THREE.ImageUtils.loadTexture("../assets/textures/general/" + imageFile);
        var mat1 = new THREE.MeshPhongMaterial({
            map: t
        });
        var mesh = new THREE.Mesh(geom, mat1);
        return mesh;
    }

    return mesh;
}
drawBase.prototype.createRedBallMesh = function(radius) {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "airPlane";
    // Create the cabin
    var geomMainBall = new THREE.SphereGeometry(radius, 40, 40);
    var matMainBall = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    var mainBall = new THREE.Mesh(geomMainBall, matMainBall);
    mainBall.castShadow = true;
    mainBall.receiveShadow = true;
    this.mesh.add(mainBall);
    return this.mesh;
}