const PORT = 8888;
const http = require('http'),
	fs   = require('fs'),//文件模块
	url  = require('url'),
	path = require('path'),
	util = require('./util');
// var [http,fs,url,path,mime] =  ['http','fs','url','path','./mime'].map((x) => require(x))

http.createServer(tellme)
.listen(PORT);

console.log('Server start')
console.log('Server runing: '+ getIPAdress() + ':' + PORT);



//请求进来时候执行的代码
function tellme(req,res){
 	req.setEncoding('utf-8');// 以utf-8编码来接收请求

    var pathname = url.parse(req.url).pathname
    // .replace(/^\/.+?\/$/,function(a){return a + 'index.html'}); //如果是文件夹结尾，跟上index.html

    var	fileUrl = (__dirname + pathname).replace(/\\/g,'\/') ;

    console.log('--')
    console.log('---fileUrl----' + fileUrl);
    // console.log('---pathname---' + pathname)

    if(pathname === '\/'){
    	//目录
    	openFolder('./',res)
    }else if(/^\/json$/.test(pathname)){
    	// json
    	responsePost(req,res)
    } else {
    	// 文件
    	openFile(fileUrl,req,res)
    }
};






// FUNCTIONS
// 
// 
// 
// 


//打开一个文件
function openFile(url,req,res){
	var fileUrl = url
    fs.readFile(fileUrl,'binary',function(err,data){

    	if(!err){
    		//文件后缀
	    	var ext = path.extname(fileUrl);
	    	ext = ext ? ext.slice(1) : 'unknown';
	    	// console.log(ext);

	    	//文件对应的类型
	    	var contentType = util.mime[ext] || 'text/plain';
	    	// console.log(contentType);


	    	//写入返回头
	    	res.writeHead(200,{'Content-Type':contentType});
	    	console.log(contentType)
	    	//写入返回内容
	    	res.write(data,'binary');
	    	res.end();
    	}else{
    		openFolder(url,res)
    		
    	}
    })
}


// 返回请求的参数
function responsePost(req,res){
	var _json = ''
	req.on('data',function(a){
		_json += a
	})
	req.on('end',function(){
		res.writeHead(200,{'Content-Type':'text/json'});
    	res.write(_json);
    	res.end();
    	console.log('-------------end POST')
    	try{
    		console.log(JSON.parse(_json))
    	}
    	catch(err){
    		console.log(_json)
    	}
	})
}



function getIPAdress(){
    var interfaces = require('os').networkInterfaces();      
    for(var devName in interfaces){
          var iface = interfaces[devName];
          for(var i =0;i < iface.length;i++){
               var alias = iface[i];
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }
    }  
}

// 打开一个目录
function openFolder(url,res){
	fs.readdir(url,function(err,files){
		if(!err) {
			//文件夹为空
			if(files.length === 0){
				finished([{
					html:'<div style="margin:10px;">空文件夹</div>'
				}])
			}
			var list = []
			var fileNum = 0
			for(var index in files){
				var val = files[index]
				getFileType(url,val,function(type,val){

					if(type != -1){
						list.push(listTemplate(type,val))
					}
					console.log(val)
					// console.log(type)
					// 
					// 所有文件检验完成
					// 
					if(++fileNum == files.length){
						finished(list)
					}
				})
			}
			function finished(list){

				// 根据文件类型对列表排序
				list.sort(function(a,b){
					return a.type - b.type
				})
				var listHTML = ''
				for (var item in list){
					listHTML += list[item].html
				}

				var filepath = url.toLowerCase().replace(/\\/g,'/').replace(__dirname.toLowerCase().replace(/\\/g,'/'),'').replace(/^\/|\/$/g,'').split('/')
				var folderpath = '/'
				var txt = 
	    		'<head><meta charset="utf-8"/><link rel="stylesheet" href="/style.css"/></head>' +
	    		'<body>' + 
	    		'<header><a href="/">root</a>>' + 
	    		filepath.map(function(val){
	    			return '<a href="' + (folderpath+=val+'/') + '">'+ val +'</a>'
	    		}).join('>')
	    		 +'</header>' +
	    		 listHTML + 
	    		'</body>'
				res.writeHead(200,{'Content-Type':'text/html'});
		    	res.write(txt);
				res.end();
			}
		} else {
			fileNum++
			console.log(err);
			if(!files){
				responses.notFind(res)
			}
			// console.log(files)

		}
	})
}


// 判断文件或文件夹是否存在
// 
function getFileType(path,val,callback){
	fs.stat(path+val,function(err,file){
		var type
		if(!err){
			if(file.isDirectory()){
				type = 0
				console.log('文件夹')
			}else if(file.isFile()){
				type = 1
				console.log('文件');
			}else{
				type = 2
				console.log('路径存在')
				console.log(file)
			}
		}else{
			type = -1
			console.log('文件不存在')
		}
		callback && callback(type,val)
	})
}


function listTemplate(type,val){
	return {
		type:type,
		html:'<div class="list-div"><a class="list-file'+ (type==0 && ' folder' || '') +'" href="' + val + (type==0 && '/' || '') + '"' + (type==1 && ' target="_blank"' || '') +'>' + val + '</a></div>'
	}
}

function log(){
	console.log(arguments)
}

var responses = {
	head:function(title){
		return '<!DOCTYPE html><html><head><meta charset="utf-8" /><title>'+title+'</title></head>'
	},
	body:function(val){
		return '<body>' + val + '</body></html'
	},
	notFind:function(res){
    	this.resHTML(
    		this.head('404 - 未找到!') + 
			this.body('<h1 style="text-align:center;margin-top:50px">没有找到该文件</h1>'),
			res
			)
	},
	resHTML:function(txt,res){
    	res.writeHead(404,{'Content-Type':'text/html'});
    	res.write(txt);
		res.end();
	}
}
