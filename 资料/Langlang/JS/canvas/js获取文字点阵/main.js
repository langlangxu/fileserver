var getDot = (function(){
	typeof canvasOfGetDot == 'undefined' &&( canvasOfGetDot = document.createElement('canvas') );
	var can = canvasOfGetDot,
		ctx = can.getContext('2d'),
		size, //字体大小
		imgData,
		arr; //点阵数组

	function draw(text,size,fontType){
		// text 	文本
		// size 	字体大小
		// fontType 字体

		//绘制文字
		size   	= Math.max(size || 12,12);
		can.width = can.height = size
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = 'red'
		ctx.font = size +'px ' + fontType || 'Arial'
		ctx.fillText(text,size/2,size/2)

		//获取图像数据
		arr = []
		imgData = ctx.getImageData(0,0,size,size).data;
		//返回红色点坐标
		for(var i = 0; i < imgData.length;i+=4){

			imgData[i+3] > 0 && arr.push({
				x:i/4%W,
				y:~~(i/4/W),
			})
		}
		// ctx.clearRect(0,0,W,H)//清空画布
		return arr;
	}
	return draw;
})();



document.body.appendChild(canvasOfGetDot)








var can = document.getElementById('canvas'),
	ctx = can.getContext('2d'),
	W = 12
	
	can.width = 60;
	can.height = 60;
	var rate = can.width / W;
	var arr = getDot('9',W,'Verdana')
	for(var i = 0;i<arr.length;i++){
		ctx.beginPath();
		ctx.arc(arr[i].x*rate+2,arr[i].y*rate+2,2,0,2*Math.PI);
		ctx.fill();
	}
	// ctx.putImageData(imgData,0,0);
