<span id="fps" style="font-size:30px"></span>
<script type="text/javascript">
	$(function(){
		// var oldTime = Date.now();
		var preTime = Date.now();
		var fps = 0;
		setInterval(function(){
			fps++
			var nowTime = Date.now();
			if(nowTime - preTime >=1000){
				preTime = nowTime
				console.log(fps);
				// $('#fps').text(fps);
				fps=0
			}
		}, 10);
	})
</script>