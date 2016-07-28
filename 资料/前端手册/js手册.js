var book = new Object

book.propertyType = function(){

	// 对象属性类型
	var newObj = new Object;
		newObj._age = 18;

	Object.defineProperty(newObj,'_age',{
		configurable:false,//表示能否使用delete操作符删除从而重新定义，或能否修改为访问器属性。默认为true;
		enumberable:false,//表示是否可通过for-in循环返回属性。默认true;
		writable:false,//表示是否可修改属性的值。默认true;
		value:100//包含该属性
	})

	console.log(newObj._age)  //100

	// getter && setter
	Object.defineProperty(newObj,'age',{
		get:function(){
			// return this.__age
			return 'get_age'
		},
		set:function(val){
			this.__age = val
		}
	})
	console.log(newObj.age) // get_age
	console.log(newObj.__age) // undefined
	newObj.age = 123
	console.log(newObj.age) // get_age
	console.log(newObj.__age) // 123
}


