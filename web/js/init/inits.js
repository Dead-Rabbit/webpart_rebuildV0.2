var Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
    brownDark:0x23190f,
    blue:0x68c3c0,
};
var loadMeshSucc = false,connectWebSocketSucc = false;
var logs = document.getElementById("logs");
var backgroundColor = 0x68c3c0;

var ambientLight, hemisphereLight, shadowLight;

var my_ball,my_id,new_ball,Balls;

var readyLoop = false;
var allBallJson = {

};
var axes;
//定义鼠标
var myMouse ;
//定义计时器
var time = 0;
//规定每次接收位置消息
var receiveTime = 1;
//鼠标位置
var x = 0;
var y = 0;
//websocket
var websocket;
//mouse control time
var mouse_time = 0;

var testmouseput = 0;
//添加鼠标
function createMouse(){
	myMouse = new mouse();
	myMouse.draw(scene);
	console.log("add mouse！");
}

//添加坐标轴
function createAxes(){
	axes = new THREE.AxisHelper(20);
	scene.add(axes);
	console.log("add Axes!");
}

var webGLRenderer,scene ,renderer,spotLight,Camera ;
function createScene(){
  webGLRenderer = new THREE.WebGLRenderer();
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(backgroundColor, 100,950);

	renderer = new THREE.WebGLRenderer({antialias:true});//生成渲染器对象（属性：抗锯齿效果为设置有效）
	renderer.setClearColor(new THREE.Color(backgroundColor, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;

	Camera = new camera(new position(5,5,0));

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

}

function loadBalls(){
  logs.innerHTML="正在装载玩家<br />";
	Balls = [];
	Balls = new Array();
	new_ball = new ball();
  logs.innerHTML+="玩家登陆完毕<br />";
}
var stones;
function loadMap(){
  logs.innerHTML+="正在加载地图<br />";
  stones = new Array();
  for(var stone_i = 0;stone_i < 100;stone_i++){
      
  }
  var oneStone = new stone();
  stones.push(oneStone);
  for(var stone_index in stones){
    stones[stone_index].draw(scene);
  }
  logs.innerHTML+="加载地图完毕<br />";
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

var particleSystem ,particleCount,particles,pMaterial,particlesHeight;
function createParticle(){
    // 创建粒子geometry
    particleCount = 1800;
    particlesHeight = 150;
    particles = new THREE.Geometry();
    pMaterial = new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 5,
        map: THREE.ImageUtils.loadTexture(
          "../assets/textures/particles/snowflake2.png"
        ),
        blending: THREE.AdditiveBlending,
        transparent: true
      });
    // 依次创建单个粒子
    for(var p = 0; p < particleCount; p++) {
      // 粒子范围在-250到250之间
      var pX = Math.random() * 500 - 250,
          pY = Math.random() * 500 - 250,
          pZ = Math.random() * particlesHeight,
          particle = new THREE.Vector3(pX, pY, pZ);
      particle.velocityZ = Math.random() * 0.6;
      particle.velocityX = Math.random() * 0.6;
      particle.velocityY = Math.random() * 0.6;
      // 将粒子加入粒子geometry
      particles.vertices.push(particle);
    }
    // 创建粒子系统
    particleSystem =
      new THREE.ParticleSystem(
        particles,
        pMaterial);
    particleSystem.sortParticles = true;
    // 将粒子系统加入场景
    scene.add(particleSystem); 
}