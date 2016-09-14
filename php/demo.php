<?php
require 'include.php';




// deleteList('a888888',$con,'8886');
// createList('a888888',$con,'88');

$insertVal = array(
	'title' 	=>	'biaoti',
	'content' 	=>	'content',
	'cover' 	=>	$_GET['title'],
	'storeup'	=>	'收藏数'
	);




insertList('a888888',$con,$insertVal);
selectList('a888888',1,10,$con);
selectList('a888888',2,10,$con);
selectList('a888888',3,10,$con);



// echo json_encode($insertVal);


echo '</br>';
echo 'end';
echo '</br>';
