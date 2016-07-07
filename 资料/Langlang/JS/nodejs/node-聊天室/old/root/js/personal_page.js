
	
	//更改根节点字体大小
	window.onresize = function(){
		var font_size  = window.innerWidth / 320 * 100;
		$('html').css('font-size',font_size + 'px');
	};
	window.onresize();


	//A股收益率图
	// var c=document.getElementById("myCanvas");
	// var ctx=c.getContext("2d");
	// ctx.beginPath();
	// ctx.moveTo(0,0);
	// ctx.lineTo(300,150);
	// ctx.stroke();
	console.log(123)


	var can = $('#income-rate')[0];
		canx = can.getContext('2d');

	canx.beginPath();
	canx.moveTo(0,0);
	canx.lineTo(300,150);
	canx.stroke();








