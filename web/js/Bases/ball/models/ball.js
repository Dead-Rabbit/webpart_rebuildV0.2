/*
    基类
    写了运动的方法
*/
function ball(){
    drawBase.call(this);

    this.id = "0";
    this.name = "";
    this.color = "";
    this.nameMesh = new THREE.Mesh() ;
    //技能效果
    this.skill = "none";
    //每个周期所需跳数
    //也用于粒子效果的产生
    this.cycleTime = 13;
    this.usedTime = 0;
    //位置
    this.position = new position(5,5,0);//当前position
    this.nextPosition = new position(5,5,0);
    this.lastPosition = new position(5,5,0);
    this.currectPosition = new position(0,0,0);
    //小球半径
    this.radius = 5;
    //加的力
    this.power = 0;
    //速度
    this.speed = 4;
    //用于对比是否为新加入或退出
    this.flag = 0;
    //转速
    this.perRotation = 0.3;
    //作为旋转使用的K值
    // this.rotaX = 1;
    // this.rotaY = 1;
    this.rotaXAY = {x:0.0,y:1.0};
    this.xAxis = new THREE.Vector3(1,0,0);

}
(function(){
    var Super = function(){};
    Super.prototype = drawBase.prototype;
    ball.prototype = new Super();
})();
//小球位置更新，不传递参数，通过自身的 nextposition 更改
//小球的新position来自messageServer的新消息
//更新小球的粒子效果
ball.prototype.removeself = function() {
    scene.remove(this.core);
    scene.remove(this.nameMesh);
};
ball.prototype.doUpdate = function() {
    switch(this.skill){
        case "flash":
            this.speed = 10;
            this.flashMove();
        break;
        
        default:
            this.speed = 4;
            this.normalMove();
        break;
    }
    this.particleUpdate();
};
//运动方式1：向next position运动
ball.prototype.normalMove = function() {
    this.moveToNext();
};
//运动方式2：闪现运动
ball.prototype.flashMove = function() {
    this.turnToNext();
};
ball.prototype.particleUpdate = function() {
    
};
//运动1
ball.prototype.moveToNext = function() {
    //同步本地next position
    this.usedTime++;
    this.currectPosition = this.getCurrectTime();
    if(this.position != this.nextPosition){
        
        this.position.x = this.currectPosition.x;
        this.position.y = this.currectPosition.y;
        this.position.z = 0;
        this.core.position.x = this.position.x;
        this.core.position.y = this.position.y;
        this.core.position.z = this.position.z;

        this.nameMesh.position.x = this.position.x;
        this.nameMesh.position.y = this.position.y;
        //网上找出的 矩阵旋转方案：
        //http://stackoverflow.com/questions/11060734/how-to-rotate-a-3d-object-on-axis-three-js
        this.rotateAroundWorldAxis(this.core,this.xAxis,Math.PI / 360*this.speed);
    }
};
//运动2
ball.prototype.turnToNext = function() {
    // 效果
    var pointColor = "#ccffcc";
    var pointLight = new THREE.PointLight(pointColor);
    shadowLight.position.set(this.lastPosition.x, this.lastPosition.y, this.radius);
    pointLight.distance = 100;
    scene.add(pointLight);
    
    this.position.x = this.nextPosition.x;
    this.position.y = this.nextPosition.y;
    this.position.z = 0;

    this.core.position.x = this.position.x;
    this.core.position.y = this.position.y;
    this.core.position.z = this.position.z;
    console.log(this.position);
    //网上找出的 矩阵旋转方案：
    //http://stackoverflow.com/questions/11060734/how-to-rotate-a-3d-object-on-axis-three-js
    this.rotateAroundWorldAxis(this.core,this.xAxis,Math.PI / 360);

};
//更新服务器接收位置
//改变lastPosition的记录
//外加更新小球旋转角度
//重置周期使用时间
ball.prototype.setNextPosition = function(position) {
    this.lastPosition = this.nextPosition;
    this.nextPosition = position;

    this.rotaXAY = this.getRotateXAY(this.position,this.nextPosition);
    this.xAxis = new THREE.Vector3(this.rotaXAY.x,this.rotaXAY.y,0);

    this.usedTime = 0;
    //创建小球粒子
    // this.particleUpdate();
};

ball.prototype.setPosition = function(position) {
    this.position = position;
    //初始化core.position
    this.core.position.x = position.getX();
    this.core.position.y = position.getY();
    this.core.position.z = position.getZ();
};
//get / set
ball.prototype.getPosition = function() {
    return this.position;
};
ball.prototype.getPower = function() {
    return this.power;
};
ball.prototype.setPower = function(power) {
    this.power = power;
};
ball.prototype.setRadius = function(radius) {
    this.radius = radius;
};
ball.prototype.getId = function() {
    return this.id;
};
ball.prototype.setId = function(id) {
    this.id = id;
};
ball.prototype.getCurrectTime = function() {
    var x = (this.nextPosition.x - this.lastPosition.x)*this.usedTime/this.cycleTime + this.lastPosition.x;
    var y = (this.nextPosition.y - this.lastPosition.y)*this.usedTime/this.cycleTime + this.lastPosition.y;
    return {'x':x,'y':y}
};
ball.prototype.getNextPosition = function() {
    return this.nextPosition;
};


//创建小球的粒子效果,number 为粒子出现的数量
ball.prototype.createParticle = function(type,number) {
    var particleCount = number;
    var particleSys,pMaterial,particlesHeight;
    this.particles = new THREE.Geometry();
    switch(type){
        case "snow":
            pMaterial = new THREE.ParticleBasicMaterial({
                color: 0xFFFFFF,
                size: 5,
                map: THREE.ImageUtils.loadTexture("../assets/textures/particles/raindrop-2.png"),
                blending: THREE.AdditiveBlending,
                transparent: true
            });
        break;
    }
    for(var p = 0; p < particleCount; p++) {

        var pX = (Math.random()*1 - 0.5) * this.currectPosition.x,
            pY = (Math.random()*1 - 0.5) * this.currectPosition.x,
            pZ = (Math.random()*1 - 0.5) * this.radius,
        particle = new THREE.Vector3(pX, pY, pZ);
        particle.velocityZ = 0.1;
        particle.velocityX = 0;
        particle.velocityY = 0;
        // 将粒子加入粒子geometry
        this.particles.vertices.push(particle);
    }
    particleSys = new THREE.ParticleSystem(
        this.particles,
        pMaterial);
    particleSys.sortParticles = true;
    scene.add(particleSys);
    return particleSys;
};


ball.prototype.rotateAroundObjectAxis = function(object, axis, radians) {
    var rotObjectMatrix;
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    // object.matrix.multiplySelf(rotObjectMatrix);      // post-multiply
    // new code for Three.JS r55+:
    object.matrix.multiply(rotObjectMatrix);

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js r50-r58:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // new code for Three.js r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
}
// Rotate an object around an arbitrary axis in world space       
ball.prototype.rotateAroundWorldAxis = function(object, axis, radians) {
    var rotWorldMatrix;
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    // old code for Three.JS pre r54:
    //  rotWorldMatrix.multiply(object.matrix);
    // new code for Three.JS r55+:
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js pre r59:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // code for r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
}
ball.prototype.getRotateXAY = function(fromPosition,toPosition){
    //利用公式 y2=(x0-x1)*x2/(y1-y0)计算法向量，x2位
    var fX = fromPosition.getX();
    var fY = fromPosition.getY();
    var tX = toPosition.getX();
    var tY = toPosition.getY();
    var x2 = 1;
    var y2 = 0;
    if((tY-fY) > 0){
        x2 = -1;
    }else{
       x2 = 1;
    }
    if(tY == fY){
        if((tX - fX) > 0) y2 = 1;
        else y2 = -1;
    }else{
        y2 = (fX - tX)*x2*1.0/(tY - fY);
    }
    // console.log("x:"+x2+",y:"+y);
    return {x:x2,y:y2}
}
ball.prototype.createText = function(content) {
    var options = {
        size: this.radius,
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
};
ball.prototype.createTextMesh = function(geom) {
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