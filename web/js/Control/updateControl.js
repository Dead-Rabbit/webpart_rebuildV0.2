function systemUpdate(time,receiveTime){

	mouse_time++;

	sendMousePosition();
	ballUpdate();
	particleUpdate();

	if(my_ball != null  || my_ball != undefined || my_ball != ''){
		gameCenter = my_ball.position;
	}
	Camera.setLookAt(gameCenter);
	Camera.setPosition(gameCenter);
    //及时更改鼠标中心，将小球的位置传入
    myMouse.doUpdate(gameCenter);

    return time>=receiveTime?0:++time;
}
/*
	小球更新控制方法
	使用 allBallJson
*/
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var sendNumber = -1;
    if(e){ // 按 F2 
    	switch(e.key){
    		case'q' :
    			sendNumber = 0;
    			testmouseput = 1;
    			testShowParticle();
    		break;
    		case'w' :
    			sendNumber = 1;
    		break;
    	}
    	if(sendNumber == -1) return ;
	    var keyboard = {
			'key':sendNumber
		}
		var sendMessage = {
			'type':'keyboard',
			'content':keyboard
		}
		websocket.send(JSON.stringify(sendMessage));
    }
}; 
function ballUpdate(){
	for(var i = 0;i < Balls.length;i++){
		Balls[i].doUpdate();
	}
}
function getBallById(id){
	var resBall ;
	for(var oneBall in Balls){
		if(Balls[oneBall].getId() == id){
			resBall = Balls[oneBall];
		}
	}
	return resBall;
}

//鼠标更新事件
document.onmousemove = mouseMove;
function mousePosition(ev){
	if(ev.pageX || ev.pageY){
		return {pos_x:ev.pageX, pos_y:ev.pageY};
	}
	return {
		pos_x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		pos_y:ev.clientY + document.body.scrollTop - document.body.clientTop
	};
}
function mouseMove(ev) {
	ev = ev || window.event;
	var mousePos = mousePosition(ev);
	//获得中心点
	x = mousePos.pos_x - document.body.clientWidth / 2;
	y = mousePos.pos_y - document.body.clientHeight / 2;
}
function sendMousePosition(){
	var mouseJson = {
		'x':x,
		'y':-y
	}
	var sendMessage = {
		'type':'mouse',
		'content':mouseJson
	}
	if(mouse_time >= 5){
		websocket.send(JSON.stringify(sendMessage));
		mouse_time = 0;
	}
}