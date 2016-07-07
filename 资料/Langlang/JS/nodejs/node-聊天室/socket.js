var PORT     = 9999;
var http     = require('http'),
	socketio = require('socket.io');

var common = [];//聊天信息

var app = http.createServer(
    function(request,response){
    	response.end('ok');
    }
);
app.listen(PORT);
console.log('server start at '+ PORT);

var io = socketio.listen(app);

io.sockets.on('connection',function(socket){
	console.log("Websocket connect ok ....");

	socket.emit('contact',{content:'握手成功！！'});
	socket.emit('c2',common);//公布消息

	//接收消息事件
	socket.on('c1',function(data){
		common.push(data);
		io.sockets.emit('c2',common);//公布消息
		//使用socket对象则单独发送消息

	})

	//接收消息事件
	socket.on('c3',function(data){
		// common.push(data);
		console.log('ping' + data);
		socket.emit('c4',data);//公布消息
		//使用socket对象则单独发送消息

	})
	// socket.on('ping',function(data){
	// 	console.log(data);
	// 	io.sockets.emit('ping2',data)
	// })
})
// //请求进来时候执行的代码
// function tellme(request,response){
//     //在后台控制台提示有访问进来了。

//     var	fileUrl = __dirname  + url.parse(request.url).pathname;

//     //打开一个文件
//     fs.readFile(fileUrl,'binary',function(err,data){
//     	if(!err){
//     		//文件后缀
// 	    	var ext = path.extname(fileUrl);
// 	    	ext = ext ? ext.slice(1) : 'unknown';
// 	    	console.log(ext);

// 	    	//文件对应的类型
// 	    	var contentType = mime.types[ext] || 'text/plain';
// 	    	console.log(contentType);

// 	    	//写入返回头
// 	    	response.writeHead(200,{'Content-Type':contentType});
// 	    	//写入返回内容
// 	    	response.write(data,'binary');
// 	    	response.end();
//     	}else{
//     		response.end('<h1>404</h1>');
//     	}
//     })
    
   
// };

// console.log(path.exists);
// console.log('Server runing '+PORT);