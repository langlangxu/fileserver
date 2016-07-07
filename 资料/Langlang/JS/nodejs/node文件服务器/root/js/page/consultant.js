$(function(){

//Info = {}
Info.consuListUrl = Info.port + ':8888/investment/tglb';//请求投顾列表
Info.pageNo = 1;//当前页码
Info.sort = 1;//当前排序方法
Info.work = 0;//当前加载任务数

//加载投顾列表
function loadConsuList(list,callback){
  list.state = '加载中...';
  $.ajax({
    url:Info.consuListUrl,
    type:'POST',
    contentType: 'text/plain',
    data:JSON.stringify({
      sort:Info.sort,
      pageNo:Info.pageNo,
      pageLength:10
    }),
    success:function(data){
      if(data.o_CODE == 1){
        list.items = list.items.concat(data.o_result);
        //加载成功
      }else{
        alert(data.o_NOTE);
        //加载失败
      };
      if(data.o_result.length == 0){
        list.state = '没有更多了！';
      }else{
        list.state = '';
      }
      
      Info.work = Math.max(0,Info.work-1);//执行成功任务数减一
      typeof callback == 'function' && callback();
    },
    error:function(a){
      list.state = '加载失败，刷新页面试试！';
    }
  });
};
//加载更多
function loadMore(){
  var list = _list;
  Info.pageNo++;
  loadConsuList(list);
};

//////////////////////排序方法
new Vue({
  el: '#classify',
  data: {
  	state:'',
    todos: [
      { text: '总' },
      { text: '年' },
      { text: '月' },
      { text: '日' }
    ]
  },
  methods:{
  	changeTab:function(index){
  		var list = _list;
      this.state = index;
  		list.items = [];
      Info.pageNo = 1;
      Info.sort  = index+1;
  		loadConsuList(list);
  		 // = _data[index].items.sort(function(a,b){return b.rate - a.rate});//sort添加排序，按照rate值从大到小排序
  	}
  }
});
/////////////////投顾列表
_list = new Vue({
  el: '#con-list',
  data: {
  	// incomerate:'rate',//排序字段
    items: [],
    state:'',
  },
  methods:{
  	//添加关注事件
  	addAttent:function(index){
      util.attent({
        data:{
          sj:123,
          tgId:this.items[index].id,
          czbz:1
        },
        success:function(){
        },
        error:function(){
        }
      });
  	}
  }
});


//下拉加载事件
$(window).on('scroll',function(){
  //高度
  var page = $(document).height(),
      win  = $(window).height(),
      top  = $(window).scrollTop();

      if(top + win >= page - 20 && Info.work == 0){
        Info.work++;
        loadMore();
      }
      // console.log(top)

});



// var banner = new bannerObj('#banner');


//排序焦点
$('#classify').find('li:first-child a').click();

//

// 点击li 跳转
$('#con-list').on('click','li',function(e){
	var tag = e.target.tagName.toLowerCase();
	if(tag == 'button' || tag == 'a' || $(e.target).attr('type') == 'button') return false;
	
	window.location.href = $(this).attr('data-href');
});



//页面切换 投顾/我
$('#change-tab').on('click','a',function(){
		var _id = $(this).attr('data-id');
		$(this).parents('ul')[0].className = _id;
		$('#consultant,#individual').removeClass();
		$('#' + _id).addClass('active');
}).find('a').eq(0).click();







//
})
// a.sort(function(a,b){return b.rate - a.rate})
