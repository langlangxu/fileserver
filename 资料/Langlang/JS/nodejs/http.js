var http = require('http')

var resp
http.createServer(function(a,b){

	console.log(123);
	// setInterval(function(){
	// 	b.write(1)
	// },2000)

	b.write('bbbb')
	if(resp){
		resp.end('end')
	}
	resp = b
	// b.end()


}).listen(12345)