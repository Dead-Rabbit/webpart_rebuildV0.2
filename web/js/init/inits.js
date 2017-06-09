var Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
    brownDark:0x23190f,
    blue:0x68c3c0,
    background:0xede36f
};
var loadMeshSucc = false,connectWebSocketSucc = false;
var logs = document.getElementById("logs");

var ambientLight, hemisphereLight, shadowLight;

var _gamemap ;

var my_ball,my_id,Balls,Plygons,gameCenter;

var readyLoop = false;

var _BALL;
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
	scene.fog = new THREE.Fog(Colors.background, 100,950);

	renderer = new THREE.WebGLRenderer({antialias:true});//生成渲染器对象（属性：抗锯齿效果为设置有效）
	renderer.setClearColor(new THREE.Color(Colors.blue, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;

	Camera = new camera(new position(5,5,0));

	document.getElementById("WebGL-output").appendChild(renderer.domElement);
}
function bindEvent(){
  document.getElementById('joinGame').onclick = function(){
    if(document.getElementById('name').value==''){
      alert("fuck you! input your name!");
      return ;
    }
    var sendMessage = {
      'type':'joinGame',
      'name': document.getElementById('name').value
    }
    websocket.send(JSON.stringify(sendMessage));
  }
}
function loadBalls(){
  _BALL = new ball_interface();
  logs.innerHTML="正在装载玩家<br />";
  _gamemap = new gameMap();
	Balls = [];
  Plygons = new Array();
	Balls = new Array();
  logs.innerHTML+="玩家登陆完毕<br />";
  gameCenter = new position(0,0,0);
}
var stones;
function loadMap(){
  logs.innerHTML+="正在加载地图<br />";

  staticItems = [];

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
