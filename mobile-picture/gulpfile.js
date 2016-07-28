var config = require('./config')
var swig = require('swig')
var gulp = require('gulp')
var stream = require('through2').obj


	
swig.setDefaults({
	cache:false
})

var context = new Object //渲染模板上下文
context.config = config
context.title = '网页标题'












gulp.task('swig',function(){

	gulp.src('./src/pages/*.html')
	.pipe(stream(function(file,uncode,callback){
		// console.dir(file)
		if(file.contents){
			var content = String(file.contents)

			content = swig.compile(content,{
				filename:file.history[0]
			})
			(context)

			file.contents = new Buffer(content)
			console.log('run')
		}
		callback(null,file)
	}))
	.pipe(gulp.dest('./build/pages/'))

})
gulp.watch('./src/**',['swig'])





// console.log(swig)

// var layout = swig.compileFile('./src/layout/layout.html')({
// 	config:config,
// 	title:'标题i'
// })
// console.log(layout)


// console.log(config)