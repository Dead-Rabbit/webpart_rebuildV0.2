/*
	添加小球类型
*/
var _balls_info = [
	{
		ballType:'normal',
		className:'normal_ball',
		filePath:'normal_ball.js'

	},{
		ballType:'red',
		className:'red_ball',
		filePath:'red_ball.js'
	},
];

document.write('<script language=javascript src="./js/Bases/ball/models/ball.js"></script>');
for(var index_info_ball=0 ;index_info_ball < _balls_info.length;index_info_ball++){
	document.write('<script language=javascript src="./js/Bases/ball/models/'+_balls_info[index_info_ball].filePath+'"></script>');
}
function ball_interface(){
    this.type = 0;
}
ball_interface.prototype.createBall = function(type) {
	var className = "";
	for(var index_info_ball=0 ;index_info_ball < _balls_info.length;index_info_ball++){
		if(type==_balls_info[index_info_ball].ballType)
			className = _balls_info[index_info_ball].className;
	}
	if(className=="") className="normal_ball";
    return eval("new "+className+"()");
};