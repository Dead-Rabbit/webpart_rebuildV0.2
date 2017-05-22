function messageHandle(data){
	var originJson = eval('(' + data + ')');
	switch(originJson.type){
		case "allBall":
			allBallJson = originJson.content;
			changeAllBallNextPosition();
		break;
		case "localId":
			//获取本地小球
			my_id = originJson.content;
		break;
	}
}
function changeAllBallNextPosition(){
	//更新每个小球的 nextposition
	//ball的flag清零
	for(var oneBall in Balls){
		Balls[oneBall].flag = 0;
	}
	for(var oneBallJson in allBallJson){
		//获取数据包中ID号对应的小球下标
		allBallJson[oneBallJson].flag = 0;
		for(var oneBall in Balls){
			if(Balls[oneBall].getId() == ""+allBallJson[oneBallJson].id){
				Balls[oneBall].flag = 1;
				allBallJson[oneBallJson].flag = 1;
				Balls[oneBall].setNextPosition(new position(allBallJson[oneBallJson].x,allBallJson[oneBallJson].y,0));
			}
		}
	}
	//判断玩家退出事件
	for(var oneBall in Balls){
		var i = oneBall;
		if(Balls[i].flag == 0){
			//玩家退出
			console.log("remove ball " + Balls[i].id);
			scene.remove(Balls[i].core);
		}
	}
	//判断新玩家的加入
	for(var oneBallJson in allBallJson){
		if(allBallJson[oneBallJson].flag == 0){
			console.log("add ball " + allBallJson[oneBallJson].id);
			//加入玩家
			var new_ball = _BALL.createBall("red");
			// new_ball.setRadius(1);
			// my_ball = new_ball;
			addNewBall(new_ball,allBallJson[oneBallJson].id);
		}
	}
	//判断本地小球
	if(my_ball == null  || my_ball == undefined || my_ball == ''){
		for(var oneBall in Balls){
			if(my_id==Balls[oneBall].getId()){
				my_ball=Balls[oneBall];
				//2017-5-2更改
				// renderScene();
				readyLoop = true;
			}
		}
	}
}
function getJsonFStr(str){
	var res = str;
	return eval('(' + res + ')');
}
// 添加新球，id为小球ID号
function addNewBall(newball,id,meshType){
	newball.setId(id);
	newball.draw(scene);

	Balls.push(newball);
}
function removeFBalls(array,index){
	if(index<=(array.length-1)){ 
		for(var i=index;i<array.length;i++){ 
			array[i]=array[i+1]; 
		} 
	}
	else{ 
		throw new Error('超出最大索引！'); 
	} 
	array.length=array.length-1; 
	return array; 
}