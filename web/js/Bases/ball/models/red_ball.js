/*
    用于创建小球
*/
function red_ball(){
    ball.call(this);
}
(function(){
    var Super = function(){};
    Super.prototype = ball.prototype;
    red_ball.prototype = new Super();
})();
//添加到scene
red_ball.prototype.draw = function(scene) {
    //红色暖系小球
    this.core = this.createRedBallMesh(this.radius);
    console.log("create ball succ!");

    this.createText(this.id);
    this.nameMesh.position.z = this.radius*2.5;
    this.nameMesh.position.x = -this.radius;
    this.nameMesh.scale.x = 0.5;
    this.nameMesh.scale.y = 0.5;
    scene.add(this.nameMesh);
    // this.core.add(this.nameMesh);
    
    scene.add(this.core);
};
red_ball.prototype.createRedBallMesh = function(radius) {
    this.mesh = new THREE.Object3D();
    // Create the cabin
    var geomMainBall = new THREE.SphereGeometry(radius, 40, 40);
    var matMainBall = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    var mainBall = new THREE.Mesh(geomMainBall, matMainBall);
    mainBall.castShadow = true;
    mainBall.receiveShadow = true;

    this.mesh.add(mainBall);
    return this.mesh;
}