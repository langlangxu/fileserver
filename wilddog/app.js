var Wilddog = require("wilddog");
var fs	= require('fs');


var data;

var ref = new Wilddog("https://langlangxu.wilddogio.com/");

ref.on('value',function(data,err){
	data = data.val()
	console.log(data)
})