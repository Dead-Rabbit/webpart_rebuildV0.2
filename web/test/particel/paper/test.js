// once everything is loaded, we run our Three.js stuff.
// 粒子
var particleSystem ,particleCount,particles,pMaterial,particlesHeight,paperSystem,paperUpdateSystem;
var scene;
// var 
function init() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.autoRotate = false;
    var clock = new THREE.Clock();
    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color("black", 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    // position and point the camera to the center of the scene
    camera.position.x = 30;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    createAxes();
    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    function render() {
        var delta = clock.getDelta();
        orbitControls.update(delta);
        particleUpdate();
        // render using requestAnimationFrame
        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
    }

    var ambientLight, hemisphereLight, shadowLight;
    function createLights() {
      hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
      shadowLight = new THREE.DirectionalLight(0xffffff, .9);
      shadowLight.position.set(0, 0, 350);
      shadowLight.castShadow = true;
      scene.add(hemisphereLight);
      scene.add(shadowLight);
    }
    //添加坐标轴
    function createAxes(){
        axes = new THREE.AxisHelper(20);
        scene.add(axes);
        console.log("add Axes!");
    }

    // var shape = createPaper(1,10,30,1);
    // shape.scale.x = 0.05;
    // shape.scale.y = 0.05;
    // shape.scale.z = 0.05;
    // scene.add(shape);
    createLights();
    createParticle();
    render();

    function createPaper(thickness,width,height,range,color){
        var options = {
            amount : width,
            bevelThickness : 2,
            bevelSize : 0.5,
            bevelEnabled : true,
            bevelSegments : 3,
            bevelEnabled : true,
            curveSegments : 5,
            steps : 1
        };
        var shape = createMesh(new THREE.ExtrudeGeometry(drawShape(thickness,height,range), options),width,color);
        // add it to the scene.

        return shape;
    }

    function drawShape(thickness,height,range) {
        // var thickness = 1;
        // var height = 30;
        // create a basic shape
        var shape = new THREE.Shape();
        // startpoint
        shape.moveTo(-height/2,0);
        // straight line upwards
        shape.lineTo(-height/2, thickness);
        // the top of the figure, curve to the right
        // shape.bezierCurveTo(15, 25, 25, 25, 30, 40);
        // spline back down
        shape.splineThru(
                [
                    new THREE.Vector2(height/3-height/2, thickness+range),
                    new THREE.Vector2(height*2/3-height/2, thickness-range),
                    new THREE.Vector2(height-height/2, thickness)
                ]);
        shape.lineTo(height-height/2, 0);
        // curve at the bottom
        shape.splineThru(
                [
                    new THREE.Vector2(height*2/3-height/2, 0-range),
                    new THREE.Vector2(height/3-height/2, 0+range),
                    new THREE.Vector2(0-height/2, 0)
                ]);
        // return the shape
        return shape;
    }
    function createMesh(geom,width,color) {
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -width/2));
        // assign two materials
        var meshMaterial = new THREE.MeshNormalMaterial({
            shading: THREE.FlatShading,
            transparent: true,
            opacity: 0.7
        });
        var matMainBall = new THREE.MeshPhongMaterial({color:color, shading:THREE.FlatShading});
        //  meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshBasicMaterial();
        wireFrameMat.wireframe = true;
        // create a multimaterial
        // var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
        var mesh = new THREE.Mesh(geom, matMainBall);
        return mesh;
    }
    /*************************************************************************************************************************/

    function createParticle(){
        paperSystem = new Array();
        paperUpdateSystem = new Array();
        // 创建粒子geometry
        particleCount = 20;
        particlesHeight = 150;
        var paperColor = ["blue","red","yellow","green"];
        // pMaterial = createPaper(1,10,30,1);
        // 依次创建单个粒子
        for(var p = 0; p < particleCount; p++) {
          // 粒子范围在-250到250之间
          var pX = Math.random() * 10 - 5,
              pY = Math.random() * 8 + 5,
              pZ = Math.random() * 10 - 5,
              particle = new THREE.Vector3(pX, pY, pZ);
          particle.velocityZ = Math.random() * 0.6;
          particle.velocityX = Math.random() * 0.6;
          particle.velocityY = Math.random() * 0.6;

          var newPaper = createPaper(1,10,30,1,paperColor[Math.floor(Math.random() * paperColor.length + 1)-1]);
          newPaper.scale.x = 0.05;
          newPaper.scale.y = 0.05;
          newPaper.scale.z = 0.05;
          newPaper.position.x = pX;
          newPaper.position.y = pY;
          newPaper.position.z = pZ;
          var updateX = Math.random() * 0.1,
            updateY = Math.random() * 0.1,
            updateZ = Math.random() * 0.1,
            fallSpeed = Math.random() * 0.1 + 0.05;
          paperUpdateSystem.push({x:updateX,y:updateY,z:updateZ,fall:fallSpeed});
          scene.add(newPaper);
          paperSystem.push(newPaper);
        }
        // 将纸条加入场景
        // scene.add(paperSystem);
    }
    // 环境粒子更新
    function particleUpdate(){
      var pCount = particleCount;
      for(var i = 0;i < paperSystem.length;i++){
        if(paperSystem[i].position.y <= 0){
            scene.remove(paperSystem[i]);
        }
        paperSystem[i].position.y -= paperUpdateSystem[i].fall;

        paperSystem[i].rotation.x -= paperUpdateSystem[i].x;
        paperSystem[i].rotation.y -= paperUpdateSystem[i].y;
        paperSystem[i].rotation.z -= paperUpdateSystem[i].z;
      }
    }
}
window.onload = init;
