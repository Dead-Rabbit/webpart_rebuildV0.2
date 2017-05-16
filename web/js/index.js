function init(event){
  createScene();

  meshLoad();
  createLights();
  createMouse();
  createAxes();
  loadBalls();
  // 载入地图（当前只为石头）
  // loadMap();
  //载入粒子系统
  createParticle();

  doConnect();
  
  loop();
}
function loop(){
  if(readyLoop){
    time = systemUpdate(time,receiveTime);
  }
  renderer.render(scene,Camera.getCamera());
  requestAnimationFrame(loop);
}
// function changeFunction(){
//   backgroundColor = 0x000000;
//   renderer.setClearColor(new THREE.Color(backgroundColor, 1.0));
// }
window.addEventListener('load', init, false);