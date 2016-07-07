var PORT = 8888;
var http = require('http'),
	fs   = require('fs'),
	url  = require('url'),
	path = require('path'),
	mime = require('./mime');

http.createServer(
    //这里我们传进一个函数做参数
    tellme
).listen(PORT);
 
console.log('start');
fs.readdir('newfile/',function(err,files){
	console.log(err);
	if(!err) console.log(files)
})
console.log('end');
//请求进来时候执行的代码
function tellme(request,response){
    //在后台控制台提示有访问进来了。

    var	fileUrl = __dirname  +'/root' + url.parse(request.url).pathname;

    console.log(fileUrl);

    //打开一个文件
    fs.readFile(fileUrl,'binary',function(err,data){
    	if(!err){
    		//文件后缀
	    	var ext = path.extname(fileUrl);
	    	ext = ext ? ext.slice(1) : 'unknown';
	    	console.log(ext);

	    	//文件对应的类型
	    	var contentType = mime.types[ext] || 'text/plain';
	    	console.log(contentType);

	    	//写入返回头
	    	response.writeHead(200,{'Content-Type':contentType});
	    	//写入返回内容
	    	response.write(data,'binary');
	    	response.end();
    	}else{
    		response.end('<h1>not found 404</h1>');
    	}
    })
    
   
};

console.log('Server runing --'+PORT);