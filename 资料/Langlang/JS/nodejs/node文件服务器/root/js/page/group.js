$(function(){
	



// 模拟数据
 _data = [
	{
		items :[
			{ 
		      	name: '李飞龙一号',
		      	side: '嘉兴禾兴南路营业部'
	       },
	       {
		      	name: '李1',
		      	side: '瑞安塘河北路营业部'
	       },
	       { 
		      	name: '李2',
		      	side: '上海营业部'
	       },
	       { 
		      	name: '李3',
		      	side: '嘉兴禾业'
	       },
	       { 
		      	name: '李3',
		      	side: '营业部'
	       }
			
		]
	},
	{
		items :[
			{ 
		      	name: '李22',
		      	side: '嘉兴禾兴南路营业部'
	       }
			
		]
	},{
		items :[
			{ 
		      	name: '李33',
		      	side: '嘉兴禾兴南路营业部'
	       },
	       {
		      	name: '李1',
		      	side: '瑞安塘河北路营业部'
	       },
	       { 
		      	name: '李2',
		      	side: '上海营业部'
	       },
	       { 
		      	name: '李3',
		      	side: '嘉兴禾业'
	       },
	       { 
		      	name: '李3',
		      	side: '营业部'
	       }
			
		]
	},
	{
		items :[
			{ 
		      	name: '李44',
		      	side: '嘉兴禾兴南路营业部'
	       },
	       {
		      	name: '李1',
		      	side: '瑞安塘河北路营业部'
	       },
	       { 
		      	name: '李2',
		      	side: '上海营业部'
	       },
	       { 
		      	name: '李3',
		      	side: '嘉兴禾业'
	       },
	       { 
		      	name: '李3',
		      	side: '营业部'
	       }
			
		]
	}
]
/////////////////////
new Vue({
  el: '#classify',
  data: {
    todos: [
      { text: '募集中' },
      { text: '运作中' },
      { text: '已完成' },
    ]
  },
  methods:{
  	changeTab:function(index){
  		_list.items = _data[index].items;
  	}
  }
})

_list = new Vue({
  el: '#con-list',
  data: {
    items: _data[0].items
  }
});


new Vue({
	el:'#banner'
})

var banner = new bannerObj('#banner');
//
})