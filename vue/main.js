// (function(){
// 
// 

var width = window.innerWidth,
	height = window.innerHeight,
	_width = 200,
	_height =180;




function numR(min,max){
  return ~~(Math.random() * (max-min) + min)
}


var imgObj = function(url,title){
	this.url = url;
	this.title = title;
	this.random()
}
imgObj.prototype.random = function(){
	this.left = numR(-_width/2,width+_width/2);
	this.top = numR(-_height,height+_height/2);
	this.angle = numR(-30,30);
	this.flip = false
}




var _vue = new Vue({
	el:"#app",
	data:{
		items:[],
		center:0,
	},
	methods:{
		select:function(obj,index){
			if(this.center == index){
				obj.flip = !obj.flip
				return
			}

			console.log('in')
			obj.left = (width-_width)/2;
			obj.top = (height-_height)/2;
			obj.angle = 0;
			this.center = index

			this.items.forEach(function(item,index){
				console.log(_vue.center)
				if(_vue.center != index){
					item.random()
				}
			})

		}
	}
})

var imgArr = []
for(var i=100;i--;){
	_vue.items.push(new imgObj("./images/" + (i%10) + ".jpeg","图片" + i))
}



// })()