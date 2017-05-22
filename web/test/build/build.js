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

    var shape = createPapers();
    scene.add(shape);
    createLights();
    

    var ambientLight, hemisphereLight, shadowLight;
    function createLights() {
      hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
      shadowLight = new THREE.DirectionalLight(0xffffff, .9);
      shadowLight.position.set(0, 0, 350);
      shadowLight.castShadow = true;
      scene.add(hemisphereLight);
      scene.add(shadowLight);
    }
    function createPapers(){
        var mesh = new THREE.Object3D();

        mesh = createMesh(new THREE.ParametricGeometry(radialWave, 120, 120, false));

        return mesh;
    }
    function radialWave(u, v) {
        var r = 50;

        var x = Math.sin(u) * r;
        var z = Math.sin(v / 2) * 2 * r;
        var y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;

        return new THREE.Vector3(x, y, z);
    };
    function createMesh(geom) {
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(-25, 0, -25));
        // assign two materials
//            var meshMaterial = new THREE.MeshLambertMaterial({color: 0xff5555});
        //var meshMaterial = new THREE.MeshNormalMaterial();
        var meshMaterial = new THREE.MeshPhongMaterial({
            specular: 0xaaaafff,
            color: 0x3399ff,
            shininess: 40,
            metal: true
        });
        meshMaterial.side = THREE.DoubleSide;
        // create a multimaterial
        var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);

        return plane;
    }
    //添加坐标轴
    function createAxes(){
        axes = new THREE.AxisHelper(20);
        scene.add(axes);
        console.log("add Axes!");
    }

}
window.onload = init;
