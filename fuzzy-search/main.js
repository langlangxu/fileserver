function stringLike(val,search){


	var val = 'abcdefgabaacccb';
	var search = 'adz';

	search = search.toString(),
	val = val.toString();


	var s = search.split('').map(function(a,b){
		console.log(a)
		if(val.search(a) > -1){
			return '--' + a +'--'
		}
	})
}