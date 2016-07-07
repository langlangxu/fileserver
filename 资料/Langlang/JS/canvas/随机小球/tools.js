
// tools

//随机数
function getRandom(min,max){
	return ~~(Math.random() * (max - min + 1) + min)
}
// 字符串宽度宽度
String.prototype.getSize = function(fontSize){
	var span = document.createElement('span')
	span.style.fontSize = (fontSize || 12) + 'px'
    span.style.whiteSpace = 'nowrap'
    span.innerHTML = this;
	document.body.appendChild(span);

	var size = {}
	size.width = span.offsetWidth
	size.height = span.offsetHeight;
	document.body.removeChild(span)
	return size;
}
//移动趋向
function trend(a,b,c){
	// A以C速度接近B
	c = c || 100;
	return a+(b-a)*c/10000;
}

var getDot = (function(){
	typeof canvasOfGetDot == 'undefined' &&( canvasOfGetDot = document.createElement('canvas') );
	document.body.appendChild(canvasOfGetDot)
	var can = canvasOfGetDot,
		ctx = can.getContext('2d'),
		size, //字体大小
		imgData;
		

	function draw(text,size,fontType){
		// text 	文本
		// size 	字体大小
		// fontType 字体
		//绘制文字
		var textSize = text.getSize(size); //z字符串的宽高
		size   	= Math.max(size || 12,12);
		can.width = textSize.width * 1.2;
		can.height = textSize.height * 1.4;
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = 'red'
		ctx.font = size +'px ' + (fontType || 'Arial')
		ctx.fillText(text,can.width/2,can.height/2)

		//获取图像数据
		var obj = {}
		var arr = []
		// console.log(can.width);
		// console.log(can.height);


		var dataimg = ctx.getImageData(0,0,can.width,can.height);
		imgData = dataimg.data;


		var can2 = document.getElementById('canvas2'),
			ctx2 = can2.getContext('2d');

			ctx2.putImageData(dataimg,0,0);






		//返回红色点坐标
		for(var i = 0; i < imgData.length;i+=4){

			imgData[i+3] > 0 && arr.push({
				x:i/4%can.width,
				y:~~(i/4/can.width),
			})
		}
		// ctx.clearRect(0,0,W,H)//清空画布
		obj.dots = arr;
		obj.width = can.width;
		obj.height = can.height;
		return obj;
	}
	return draw;
})();



// 小球对象
var ballObj = function(){
	//小球对象
	var that = this,
	width = can.width,
	height = can.height;

	function init(){
		that.size 	= getRandom(3,3),
		that.color 	= 'rgba(' + getRandom(0,255) + ',' + getRandom(0,255) + ',' + getRandom(0,255) + ',' + getRandom(0,255) +')',
		that.x 		= getRandom(that.size/2,width - that.size/2),
		that.y 		= getRandom(that.size/2,height - that.size/2),
		that.nX 	= that.x,//下一步坐标
		that.nY 	= that.y,
		that.v 		= getRandom(200,500),//小球运动速度
		that.s 		= getRandom(0,1);//小球休息时间
		that.lucent = getRandom(1,10)/10;//透明度
		that.scat   = false;//下一次是否打散
		draw();
	//
	}

	//移动到指定位置或基于当前位置随机移动
	that.nextStep = function(a,b){
		that.sleep = false;
		that.scat = true;
		that.lucent = 1;
		that.size 	= 3;
		// that.color = 'red'
		// a = a || (that.x + getRandom(0,20) * (Math.random() > 0.5 ? 1 : -1))
		// b = b || (that.y + getRandom(0,20) * (Math.random() > 0.5 ? 1 : -1))
		// console.log(a+'----------'+b);
		that.nX = a;
		that.nY = b;
	}
	//打散，移动到随机位置
	that.scatter = function(bool){
		that.sleep = false;
		that.lucent = getRandom(1,10)/10;
		that.size 	= getRandom(1,3)
		that.color 	= 'rgba(' + getRandom(0,255) + ',' + getRandom(0,255) + ',' + getRandom(0,255) + ',' + getRandom(0,255) +')'
		if(bool || that.scat){
			that.scat = false;
			that.nX = getRandom(0,can.width)
			that.nY = getRandom(0,can.height)
		}else{
			that.nX = (that.x + getRandom(0,20) * (Math.random() > 0.5 ? 1 : -1))
			that.nY = (that.y + getRandom(0,20) * (Math.random() > 0.5 ? 1 : -1))
		}
		
	}
	//移动
	that.move = function(){
		
		if(that.sleep){
			if(that.sleepN++ > that.s){
				that.scatter();
			}
		}
		else{
			if(Math.abs(that.x - that.nX) + Math.abs(that.y - that.nY) < 0.001){
				that.sleep = true;
				that.sleepN = 0;
			}else{
				that.x = trend(that.x,that.nX,that.v);
				that.y = trend(that.y,that.nY,that.v);
			}
			
			//碰到边缘反弹
			if(that.x < 0){
				that.nX = that.size/2 - that.nX
			}else if(that.x > width){
				that.nX = width - (that.nX - width)
			}
			if(that.y<0){
				that.nY = -that.nY
			}else if(that.y > height){
				that.nY = height - (that.nY - height)
			}
		}
		
		draw();
	}
	//draw
	function draw(){
		ctx.fillStyle=that.color;
		ctx.beginPath();
		ctx.globalAlpha= that.lucent;
		ctx.arc(that.x,that.y,that.size,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	}

init();
//
}