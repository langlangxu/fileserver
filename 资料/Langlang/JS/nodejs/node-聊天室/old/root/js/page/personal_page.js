$(function(){
	
	//A股收益率图

	Info.consuId = window.location.search.replace('?','');//投顾ID
	


var chartObj = function(Obj){
var that = this;
	that.max;
	that.min;
var can  , //canvas
	canx , //context
	canw , //canvas width
	canh , //canvas height
	max  , //最大值
	min  , // 最小值
	dVal ; //最大最小差值
	
	that.init  = function(){
	
		can  =  $('#income-rate')[0] ; //canvas
		canx =  can.getContext('2d') ; //context
		canw =  can.width ; //canvas width
		canh =  can.height ; //canvas height
		
		range();//所有数据中最大和最小值得范围
		single();//将数组拆分并绘制线条
	};


	//所有数据中最大和最小值得范围
	function range(){
		for(var i in Obj){
			var data = Obj[i].data,
				dataMax = Math.max.apply(1,data),
				dataMin = Math.min.apply(1,data);

			max = max >= dataMax ? max : dataMax ;
			min = min <= dataMin ? min : dataMin ;
		}
		dVal = max - min;
		that.max = max;
		that.min = min;
	}


	//将数组拆分
	function single(){
		for(var i in Obj){
			that.draw(Obj[i]);
		}
	}

	that.draw = function(_Obj){

		// var max = Math.max.apply(1,that.data),//最高
		// 	min = Math.min.apply(1,that.data);//最低
		// if($(that.can).data('max')){
		// 	max = Math.max(max,$(that.can).data('max'));
		// 	min = Math.min(min,$(that.can).data('min'));
		// }
		// $(that.can).data('max',max);
		// $(that.can).data('min',min);

		var	lineW = canw / 240 * 2,//线宽
			color = _Obj.lineColor || '#555',
			data  = _Obj.data || [];

		//CANVAS
		canx.beginPath();
		canx.strokeStyle = color;
		canx.lineWidth = lineW ;
		canx.lineJoin = 'round';//拐角平滑
		$.each(data,function(a,b){
			var x = a / data.length * (canw - lineW*2) + lineW,
				y = (b - min) / dVal * (canh - lineW*2) + lineW;//lineW 上下各留1线宽空白
				y = canh - y;//Y轴坐标第四象限改为第一象限
			// console.log(x +'------------'+ y +'----------'+b);
			canx.lineTo(x,y);
		});
		canx.stroke();

		// //SVG
		// gearLineElement = document.createElementNS("http://www.w3.org/2000/svg", "polyline"); 
		// gearLineElement.id = "polyline";
		// line = '';
		// $.each(that.data,function(a,b){
		// 	var x = a / that.data.length * that.canw,
		// 		y = that.canh - ((b - min) / dval * that.canh);
		// 	line += x+','+y+' ';
		// });
		// $(gearLineElement).attr('points',line);
		// gearLineElement.style.stroke = color;
		// gearLineElement.style.fill = '#fff';
		// $('#income-rate-svg').append(gearLineElement)
	};

this.init();
// this.draw();
};





function imitData(){
	//模拟数据
	 data = [55];
	for(var i=0 ; i < 150; i++){

		if((Math.random()*100)%2  >  1){
			data[i] = data[Math.max(0,i-1)] + Math.random() * 1;
		}else{
			data[i] = data[Math.max(0,i-1)] - Math.random() * 1;
		}
	}
 return data;
}










var _canvas = document.getElementById('income-rate');
	_canvas.width = $(_canvas).parent().width() * 2;//宽度放大一倍，确保高分辨率手机清晰效果
	_canvas.height = _canvas.width * 9/16;


 incomeCanvas = new chartObj([
 	{
 		lineColor:'#555',
 		data:imitData(),
 	},
 	{
 		lineColor:'red',
 		data:imitData(),
 	}
 	]);

var	maxNum = incomeCanvas.max,
	minNum = incomeCanvas.min,
	divide = (maxNum - minNum)/5;


//图表右侧数字
$('#mark-num span').each(function(index,item){

	$(this).text(parseInt((maxNum - index * divide)*100)/100);

});

//投顾信息
$.ajax({
	url: Info.port + ':8888/investment/tgxx',
	type:'POST',
	contentType: 'text/plain',
	data:JSON.stringify({
	  tgId:Info.consuId,
	}),
	success:function(data){
		if(data.o_CODE == 1){
			console.log(data)
		}else{
			alert(data.o_NOTE);
			//加载失败
			console.log(data)
		}
	}

});


new Vue({
	el:'body',
	data:{
		ryxm:'投顾姓名',
		yxxx:'xxxxxx',
		orgName:'台州黄岩天长南路证券营业部',
		grtd:'长期从事机构客户及高端客户的开发辅导工作，具有丰富的理论基础及实战经验，对金融产品研究深入，尤其擅长基本面分析和各类基金的分析、投资及配置现兼任辽宁对外经贸学院《投资分析》客座讲师。',
		gryj:'在2014年的新浪投资顾问大赛中一度排在全国前100名，收益率超过50%，并获得公司“银牌投顾”。',
		bgzs:1,
		ljsyl:99,
		qsrq:'2001-1-1',
		qszj:100,
		zzc:9999999,
	},

})

$('#gztg').click(function(){
	 util.attent({
        data:{
          sj:123,
          tgId:Info.consuId,
          czbz:1
        },
        success:function(){
        },
        error:function(){
        }
      });
})




})