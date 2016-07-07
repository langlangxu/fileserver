var can = document.getElementById('canvas'),
	ctx = can.getContext('2d'),
	width = can.width,
	height = can.height;


var startX = -Math.random()*100,
	startY = -Math.random()*100,
	endX   = Math.random()*100 + width,
	endY   = Math.random()*100 + height;

var sX2 = Math.random()*2,
	sY2 = Math.random()*2,
	eX2 = Math.random()*2,
	eY2 = Math.random()*2;


	setInterval(function(){

		

		startX<0 && startX > -1.5*width || 	(sX2=-sX2);
		startY<0 && startY > -1.5*width || 	(sY2=-sY2);
		endX<0 && endX > -1.5*width || 	(eX2=-eX2);
		endY<0 && endY > -1.5*width || 	(eY2=-eY2);

		var grd=ctx.createLinearGradient(startX+=sX2,startY+=sY2,endX+=eX2,endY+=eY2);
		grd.addColorStop(0,"red");
		grd.addColorStop(1,"blue");
		ctx.fillStyle=grd;
		ctx.fillRect(0,0,width,height);
	}, 50);
	
	
	// ctx.putImageData(imgData,0,0);
