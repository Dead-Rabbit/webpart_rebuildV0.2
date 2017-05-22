// once everything is loaded, we run our Three.js stuff.
function init() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.autoRotate = false;
    var clock = new THREE.Clock();
    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    // position and point the camera to the center of the scene
    camera.position.x = 6;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    createAxes();
    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    function render() {
        var delta = clock.getDelta();
        orbitControls.update(delta);
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

    var shape = createPapers(1,10,30,1);
    shape.scale.x = 0.05;
    shape.scale.y = 0.05;
    shape.scale.z = 0.05;
    scene.add(shape);
    createLights();
    render();

    function createPapers(thickness,width,height,range){
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
        var shape = createMesh(new THREE.ExtrudeGeometry(drawShape(thickness,height,range), options),width);
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
    function createMesh(geom,width) {
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -width/2));
        // assign two materials
        var meshMaterial = new THREE.MeshNormalMaterial({
            shading: THREE.FlatShading,
            transparent: true,
            opacity: 0.7
        });
        var matMainBall = new THREE.MeshPhongMaterial({color:"blue", shading:THREE.FlatShading});
        //  meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshBasicMaterial();
        wireFrameMat.wireframe = true;
        // create a multimaterial
        // var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
        var mesh = new THREE.Mesh(geom, matMainBall);
        return mesh;
    }
}
window.onload = init;