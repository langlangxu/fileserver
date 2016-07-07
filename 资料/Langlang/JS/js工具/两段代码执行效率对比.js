
var a = function(){
	document.querySelectorAll('.mall-inline')
}
var b = function(){
	document.getElementById('ct-root-main').getElementsByClassName('mall-inline')
}






















var loop = 1000 //循环次数
var time = 100// 执行次数



var atime = 0;
var btime = 0;

for(var i = time;i--;){
	var p = Date.now()
	for(var j=loop;j--;){
	  a()
	}
	atime += Date.now() - p

	p = Date.now()
	for(var j=loop;j--;){
	  b()
	}
	btime += Date.now() - p
}


console.log(atime,btime);