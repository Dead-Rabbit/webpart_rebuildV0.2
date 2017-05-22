/*
    用于创建小球
*/
function normal_ball(){
    ball.call(this);
    
    //粒子效果相关
    this.particles;
    this.particleSystem ;
}
(function(){
    var Super = function(){};
    Super.prototype = ball.prototype;
    normal_ball.prototype = new Super();
})();
normal_ball.prototype.particleUpdate = function() {
    if(this.particleSystem==null) {
        this.particleSystem = this.createParticle("snow",100);
        return ;
    }
    var vertices = this.particleSystem.geometry.vertices;
    for(var v in vertices){
        vertices[v].z -= (vertices[v].velocityZ);
        if (vertices[v].z <= 0) {
            vertices[v].z = this.radius;
            vertices[v].y = this.currectPosition.y;
            vertices[v].x = this.currectPosition.x;
        }
    }
};
//添加到scene
normal_ball.prototype.draw = function(scene) {
    //添加纹理的小球
    this.core = this.createTextureMesh("floor-wood.jpg");

    console.log("create ball succ!");
    scene.add(this.core);
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
