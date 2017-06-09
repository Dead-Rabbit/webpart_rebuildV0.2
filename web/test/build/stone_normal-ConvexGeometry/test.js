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
    createLights();

    // build the models
    createStone(10,10,10,[{x:5,y:5},{x:-5,y:-5},{x:-5,y:5},{x:5,y:-5}]);
    // begin draw!
    function createStone(bottom_height,bottom_width,tall,basePoints) {
        // create color
        var stoneColor = [0xeea641,0xd89941,0xa58963];
        // add 10 random spheres
        var points = [];
        for(var base_index in basePoints){
            points.push(new THREE.Vector3(basePoints[base_index].x, 0, basePoints[base_index].y));
        }
        for (var i = 0; i < 16; i++) {
            var randomX = -bottom_height/2 + Math.round(Math.random() * bottom_height);
            var randomY = Math.round(Math.random() * tall);
            var randomZ = -bottom_width/2 + Math.round(Math.random() * bottom_width);

            points.push(new THREE.Vector3(randomX, randomY, randomZ));
        }
        // points.push(new THREE.Vector3(bottom_height/2-Math.random()*bottom_height/5, 0, bottom_width/2));
        // points.push(new THREE.Vector3(-bottom_height/2-Math.random()*bottom_height/5, 0, bottom_width/2));
        // points.push(new THREE.Vector3(bottom_height/2-Math.random()*bottom_height/5, 0, -bottom_width/2));
        // points.push(new THREE.Vector3(-bottom_height/2-Math.random()*bottom_height/5, 0, -bottom_width/2));

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
        hullMesh = createMesh(hullGeometry,stoneColor[Math.floor(Math.random() * stoneColor.length + 1)-1],"blue");
        scene.add(hullMesh);
    }
    createStone.prototype.createMesh = function(geom,color) {
        // var meshMaterial = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity:1 });
            var meshMaterial = new THREE.MeshPhongMaterial({color:color, shading:THREE.FlatShading});
            meshMaterial.side = THREE.DoubleSide;
            var wireFrameMat = new THREE.MeshBasicMaterial();
            wireFrameMat.wireframe = false;

            // create a mesh
            var mesh = new THREE.Mesh(geom, meshMaterial);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            return mesh;
    };
    function createMesh(geom,color) {

        // var meshMaterial = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity:1 });
        var meshMaterial = new THREE.MeshPhongMaterial({color:color, shading:THREE.FlatShading});
        meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshBasicMaterial();
        wireFrameMat.wireframe = false;

        // create a mesh
        var mesh = new THREE.Mesh(geom, meshMaterial);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    render();
}
window.onload = init;
