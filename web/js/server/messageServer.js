var allBallJson = {

};
function messageHandle(data){
	var originJson = eval('(' + data + ')');
	switch(originJson.type){
		case "movableJson":
			allBallJson = originJson.content;
			changeAllBallNextPosition();
		break;
		case "join":
			//获取本地小球
			if(originJson.ifsuccess){
				my_id = originJson.localId;
				// readyLoop = true;
				document.getElementById("user-page").style.display = "none";
			}else{
				alert("已存在的昵称");
			}
		break;
		case "staticItems":
			//获取地图信息
			_gamemap.changeBaseSides(originJson.borderShape.points);
			_gamemap.pushStaticItems("traps",originJson.traps);
			_gamemap.pushStaticItems("blocks",originJson.blocks);
			_gamemap.draw();
		break;
		default:
			console.log(data);
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
/****************plygons test*************************/
		readyLoop = true;
		for(var oneBall in Balls){
			if(Balls[oneBall].getId() == ""+allBallJson[oneBallJson].id){
				Balls[oneBall].flag = 1;
				allBallJson[oneBallJson].flag = 1;
				if(allBallJson[oneBallJson].shape.type!="circle"){
				    // Balls[oneBall].remove_self();
				  	Balls[oneBall].setNextPoints(allBallJson[oneBallJson].shape.points);
				    // Balls[oneBall].draw_Plogin();
				}else{
					Balls[oneBall].setNextPosition(new position(allBallJson[oneBallJson].shape.center.x,allBallJson[oneBallJson].shape.center.y,0));
				}
			}
		}
/**************** finish plygons test*************************/
	}
	//判断玩家退出事件
	for(var oneBall in Balls){
		var i = oneBall;
		if(Balls[i].flag == 0){
			//玩家退出
			// scene.remove(Balls[i].core);
			Balls[i].removeself();
			if(Balls[i].getId()==my_id){
				readyLoop = false;
				my_ball = null;
				my_ball = null;
				document.getElementById("user-page").style.display = "block";
			}
			Balls.splice(i,1);
		}
	}
	//判断新玩家的加入
	for(var oneBallJson in allBallJson){
		if(allBallJson[oneBallJson].flag == 0){
			// console.log("add ball " + allBallJson[oneBallJson].id);
			//加入玩家
			if(allBallJson[oneBallJson].shape.type=="circle"){
				var new_ball = _BALL.createBall("red");
				// new_ball.setRadius(1);
				// my_ball = new_ball;
				new_ball.position = new position(allBallJson[oneBallJson].shape.center.x,allBallJson[oneBallJson].shape.center.y,0);
				new_ball.lastPoints = new position(allBallJson[oneBallJson].shape.center.x,allBallJson[oneBallJson].shape.center.y,0);
				addNewBall(new_ball,allBallJson[oneBallJson].id);
			}else if(allBallJson[oneBallJson].shape.type=="polygon"){
				var new_plygon = new plygon(allBallJson[oneBallJson].shape.points);
				new_plygon.nextPoints = allBallJson[oneBallJson].shape.points;
				new_plygon.lastPoints = allBallJson[oneBallJson].shape.points;
				addNewBall(new_plygon,allBallJson[oneBallJson].id);
			}
		}
	}
	//判断本地小球
	if(my_ball == null  || my_ball == undefined || my_ball == ''){
		for(var oneBall in Balls){
			if(my_id==Balls[oneBall].getId()){
				my_ball=Balls[oneBall];
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
function addNewBall(newball,id){
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