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
