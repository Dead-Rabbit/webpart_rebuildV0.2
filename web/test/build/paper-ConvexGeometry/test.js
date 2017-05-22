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

    function createPoints(points,height,width,thickness,u,v){
        for(var j = 0;j < 2;j++){
            for(var i = 0;i <= u;i++){
                for(var z = 0;z < 2;z++){
                    var point_x = height/2 - i*(height/u);
                    var point_y = -thickness*Math.sin(i*Math.PI);
                    var point_z = z;
                    points.push(new THREE.Vector3(point_x,point_y,point_z));
                }
            }
        }
        console.log(points);
    }
    function createPapers(){
        // var height=6,width=3,thickness=1;
        var points = [];
        // for (var i = 0; i < 20; i++) {
        //     var randomX = -15 + Math.round(Math.random() * 30);
        //     var randomY = -15 + Math.round(Math.random() * 30);
        //     var randomZ = -15 + Math.round(Math.random() * 30);

        //     points.push(new THREE.Vector3(randomX, randomY, randomZ));
        // }
        createPoints(points,6,2,1,2,1);


        var spGroup = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: false});
        points.forEach(function (point) {

            var spGeom = new THREE.SphereGeometry(0.2);
            var spMesh = new THREE.Mesh(spGeom, material);
            spMesh.position.copy(point);
            spGroup.add(spMesh);
        });
        // add the points as a group to the scene
        // scene.add(spGroup);

        // use the same points to create a convexgeometry
        var hullGeometry = new THREE.ConvexGeometry(points);
        hullMesh = createMesh(hullGeometry);
        scene.add(hullMesh);
    }
    function createMesh(geom) {

        // assign two materials
        var meshMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.2});
        meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshBasicMaterial();
        wireFrameMat.wireframe = true;

        // create a multimaterial
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

        return mesh;
    }

}
window.onload = init;
