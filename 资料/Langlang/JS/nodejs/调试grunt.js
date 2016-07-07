var fs   = require('fs');

var build = 'build';//转换后存放位置
var root = 'static/';//文件根目录
// var buildRoot = '/workspase/appsupport/appsupport/target/classes/static/';
var buildRoot = 'static/';
var working = false;
// 需要转换的文件夹
var folders = [
	'js/mall','css'
]
function grunt(){
	if(working) return false;
	working = true;
	console.log('grunt in');
	// 遍历文件夹列表
	folders.forEach(function(folder,_index){
		fs.readdir(root + folder,function(err,files){
			//获取到目录列表
			if(!err){
				// 获取build文件夹目录 并删除所有文件
				fs.readdir(buildRoot+folder+'/'+build,function(err,files){
					if(!err){
						files.forEach(function(file){
							fs.stat(buildRoot+folder+'/'+build+'/'+file,function(err,stats){
								//如果是js或者css文件
								if(stats.isFile() && /\.(css)+?$|(js)+?$/.test(file)){
									// 删除
									fs.unlink(buildRoot+folder+'/'+build+'/'+file);
								}
							})
						})
					}
				})


				// 遍历目录下所有文件
				files.forEach(function(file,index){
					//操作单个文件
					// console.log('//操作单个文件');
					// 读取文件信息
					fs.stat(root + folder + '/' + file,function(err,stats){
						//如果是js或者css文件
						if(!err && stats.isFile() && /\.(css)+?$|(js)+?$/.test(file)){
							fs.readFile(buildRoot + folder + '/' + file,'utf-8',function(err,data){
								//创建对应min文件
								// console.log(buildRoot + folder + '/' + file);
								fs.writeFile(buildRoot + folder + '/'+build+'/' + file.replace(/\./,'.min.'),data,function(){
									if(index == files.length-1 && _index == folders.length-1){
										console.log('文件创建完成！');
										var _date = new Date;
										console.log('时间: ' + _date.getHours()+ ':'+ _date.getMinutes() );
										working = false;
									} 
									// console.log(index);
								});
							})
						}

					})
					// console.log('//操作单个文件 end');
				})
			}
		})
	})
	
};

function createWatch(){
	var timer;
	// 创建侦听，侦听当前文件夹目录是否修改
	folders.forEach(function(folder){
		fs.watch(root + folder,function(state,fileName){
			clearTimeout(timer);
			timer = setTimeout(function(){
				if(/\.(css)+?$|(js)+?$/.test(fileName)){
					grunt();
				}
			}, 500);
		})
	})

}
grunt();



setTimeout(function(){
	createWatch();
}, 2000);