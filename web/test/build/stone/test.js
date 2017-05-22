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
    camera.position.x = 120;
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
    var shape = createPapers();
    scene.add(shape);
    createLights();
    render();

    function createPapers(){
        var mesh = new THREE.Object3D();

        mesh = createMesh(new THREE.ParametricGeometry(radialWave, 6, 3, false));

        return mesh;
    }
    function radialWave(u, v) {
        var r = 50;

        // var x = Math.sin(u) * r;
        // var z = Math.sin(v / 2) * 2 * r;
        // var y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;
        var height = 20;
        var width = 10;
        var x = height*u+15;
        var z = width*v+2*width;
        var y = (Math.sin(u * 2 * Math.PI) ) * 1;
        return new THREE.Vector3(x, y, z);

    };
    function createMesh(geom) {
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(-25, 0, -25));
        // assign two materials
//            var meshMaterial = new THREE.MeshLambertMaterial({color: 0xff5555});
        //var meshMaterial = new THREE.MeshNormalMaterial();
        var meshMaterial = new THREE.MeshPhongMaterial({
            color: "red",
            shininess: 40,
            metal: true,
            shading:THREE.FlatShading
        });
        var matMainBall = new THREE.MeshPhongMaterial({
            color:"red", 
            shading:THREE.FlatShading
        });
        meshMaterial.side = THREE.DoubleSide;
        // create a multimaterial
        var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
        var mainBall = new THREE.Mesh(geom, matMainBall);
        return plane;
        // return mainBall;
    }


}
window.onload = init;
