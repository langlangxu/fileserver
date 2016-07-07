// (function(){

var can = document.getElementById('canvas'),
	ctx = can.getContext('2d'),
	width = can.width,
	height = can.height;




var prev = 0;
function showText(text){
	text += ''

	var text = getDot(text,15)

	var origin = {}
		


	if(can.width/can.height >= text.width/text.height){
		origin.scale = can.height/text.height;
	}

	origin.x = can.width/2 - text.width*origin.scale/2
	origin.y = 0

	if(text.dots.length>balls.length){

		var num = (text.dots.length/balls.length)
		for(var i = 0;i<balls.length;i++){
			var index = ~~(i*num)
			balls[i].nextStep(origin.x + text.dots[index].x*origin.scale, origin.y + text.dots[index].y*origin.scale)
		}
	}else{
		for(var i = 0;i<text.dots.length;i++){
			balls[i].nextStep(origin.x + text.dots[i].x*origin.scale,origin.y + text.dots[i].y*origin.scale)
		}
		for(var i = text.dots.length;i < prev;i++){
			balls[i].scatter()
		}
	}

prev = text.dots.length;
}



var balls = []
for(var i = 0;i<200;i++){
	balls.push(new ballObj)
}
var timeS = 10;
setInterval(function(){
	showText(--timeS);
	if(!timeS){
		for(var i = 0 ;i < balls.length;i++){
			balls[i].scatter(true)
			timeS = 10
		}
	}
}, 2000);
setInterval(function(){
	ctx.clearRect(0,0,width,height)
	for(var i=0;i<balls.length;i++){
		balls[i].move()
	}
},0);

//
// })()



