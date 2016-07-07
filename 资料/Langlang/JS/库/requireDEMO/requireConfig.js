require.config({

	baseUrl: "js/",//js根目录
	paths: {
		"zepto"			: "zepto.min",
		"vue"			: "vue.min",
		"base64"		: "mall/base64",
		"zepto_cookie"	: "zepto.cookie",
		"swipe_slide"	: 'swipeSlide.min',
		'md5'			: 'mall/md5',
		'zepto_picLazyLoad':'zepto.picLazyLoad',
		'configure'		: 'mall/build/configure.min',
		'nativeInteract':'mall/build/nativeInteract.min',
		// 'common'		:'common'

		// ""
	},
	shim:{
		'zepto':{
			exports:'$',//对于非AMD模块 标明输出变量
		},
		'zepto_cookie':{
			deps:['zepto'],//依赖的模块
			exports:'$.fn.cookie' //标明输出变量
		},
		'swipe_slide':{
			deps:['zepto'],//依赖的模块
			exports:'$.fn.swipeSlide' //标明输出变量
		},
		'base64':{
			exports:'base64_decode'
		},
		'zepto_picLazyLoad':{
			deps:['zepto']
		},
		'common':{
			deps:['zepto']
		},
		'vue':{
			exports:'Vue'
		}
	}

});	