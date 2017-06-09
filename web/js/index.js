function init(event){
  createScene();

  meshLoad();
  createLights();
  createMouse();
  // createAxes();
  loadBalls();
  // 载入地图（当前只为石头）
  loadMap();
  //载入粒子系统
  createParticle();

  doConnect();
  //绑定事件
  bindEvent();
  //draw_Plogin();

  loop(); 
}
function loop(){
  if(readyLoop){
    time = systemUpdate(time,receiveTime);
  }
  renderer.render(scene,Camera.getCamera());
  requestAnimationFrame(loop);
}
window.addEventListener('load', init, false);