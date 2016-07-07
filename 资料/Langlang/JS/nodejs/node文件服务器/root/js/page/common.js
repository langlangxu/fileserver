$(function(){
	//更改根节点字体大小
	$(window).resize(function(){
		var font_size  = $(window).width() / 320 * 100;
		$('html').css('font-size', font_size + 'px');
	});
	$(window).resize();

//
Info = {};
Info.port =window.location.protocol + '//' + window.location.hostname;//请求地址



/////////////////////////////////
//轮播
bannerObj = function(parent,_time){
	var that = this;
	var touchX  = 0,//touchStart
		// skewVal = 0,//偏移值
		unitW   = 0, //单位宽度
		length  = 0,//总共长度
		ele     = parent,//父节点
		timeout = _time || 3000;//自动轮播时间


	that.index = 0 ;

	that.init = function(){
		that.initResize();
	}

	that.initResize = function(){
		unitW  = - $(ele).find('li').width();//使用负值计算
		length = $(ele).find('li').length;
	}
	that.previous = function(){
		that.index = that.index == 0 ? length - 1 : that.index - 1;
		that.animate();
	}

	that.next = function(){
		that.index = that.index == length - 1 ? 0 : that.index + 1;
		that.animate();
	}
	that.changeIndex = function(index){
		that.index = index;
		that.animate();
	}
	that.animate = function(){
		$(ele).find('ul').css({
			'-webkit-transform':'translateX(' + (that.index * unitW) + 'px)',
			'transform':'translateX(' + (that.index * unitW) + 'px)',
			'-webkit-transition':'.5s',
			'transition':'.5s'
		})
		that.initResize();
	}

	$(ele).on('touchstart',function(e){
		touchX = e.changedTouches[0].screenX;
		// unitW  = $(e.path[0]).width();
		// console.log(unitW)
	}).on('touchmove',function(e){
		var X = e.changedTouches[0].screenX;

		$(this).find('ul').css({
			'-webkit-transform':'translateX(' + (that.index * unitW + X - touchX) + 'px)',
			'transform':'translateX(' + (that.index * unitW + X - touchX) + 'px)',
			'-webkit-transition':'none',
			'transition':'none'
		})

		// console.log(this);
		// console.log(2222)
	}).on('touchend',function(e){

		var X = e.changedTouches[0].screenX;
		var skewRate = (X - touchX) / $(this).width();
		if(Math.abs(skewRate) < 0.2 ){
			that.animate();
		}else if(skewRate < 0){
			that.next();
		}else{
			that.previous();
			
		}

	});
	//窗口改变重置
	$(window).on('resize',function(){
		that.initResize();
		that.animate();
	})


	that.init();
	setInterval(that.next,timeout);
};




var	alertNum = 0;
alert = function(a){
	alertNum ++;
	if(! $('#alert').length){
		$('body').append('<span id="alert"></span>');
	}
	$('#alert').text(a).removeClass('hide');
	setTimeout(function(){
		alertNum--;
		if(alertNum == 0){
			$('#alert').text(a).addClass('hide');
		}
	},2000);
}





util = {};


util.attent = function(Obj){
	$.ajax({
		url: Info.port + ':8888/investment/gztg',
		type:'POST',
		contentType: 'text/plain',
		data:JSON.stringify(Obj.data),
		success:function(data){
			if(data.o_CODE == 1){
					// this.items[index].fans = 1;
					// alert('关注成功！');
					if(typeof Obj.success == 'function') Obj.success(data);
				}else{
					alert(data.o_NOTE);
					if(typeof Obj.error == 'function') Obj.error(data);
				}
		}

	});
};

util.alert = alert;


//返回按钮
$('#history').click(function(){
	window.history.go(-1);
})


// $(window).on('touchstart',function(){
// 	// alert('start')
// }).on('touchmove',function(){
// 	alert('move')
// })




$(window).error(function(){
	console.log(this)
})
//
})