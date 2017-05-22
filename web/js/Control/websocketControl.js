function doConnect(){
	logs.innerHTML+="正在连接服务器<br />";
	var linkString = "ws://115.159.212.28/clash/clash";
	websocket = new WebSocket(linkString);
	console.log("connect success!");
	websocket.onopen = function(){
		console.log("Connect Success");
		connectWebSocketSucc = true;
		logs.innerHTML+="连接服务器成功<br />";
	}
	websocket.onmessage = function(event){
		messageHandle(event.data);
	}
	websocket.onerror = function(){
		sendMessage("Connect Error");
		logs.innerHTML+="连接服务器成功<br />";
	}
	websocket.onclose = function(){
		sendMessage("Connect Close");
		logs.innerHTML+="与服务器断开链接<br />";
	}
}
