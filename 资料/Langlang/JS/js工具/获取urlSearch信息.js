var _Arr = location.search.match(/[\?&]\w+?=[^&]+/g);
	var _Search = {};
	if(_Arr){
		for(var i=0;i<_Arr.length;i++){
			_Search[_Arr[i].replace(/^.+?(.+?)=.*$/,'$1')] = _Arr[i].replace(/^.+?=(.+$)/,'$1')
		}
	}
	console.log(_Search);