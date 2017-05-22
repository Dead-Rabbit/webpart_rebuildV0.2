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