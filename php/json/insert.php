<?php
require 'include.php';
if (array_key_exists('title',$_GET) && array_key_exists('content',$_GET) && array_key_exists('cover',$_GET)){

	$insertVal = array(
		'title' 	=>	$_GET['title'],
		'content' 	=>	$_GET['content'],
		'cover' 	=>	$_GET['cover'],
		'storeup'	=>	null
	);
	
} else {
	die('参数不正确');
}






insertList('a888888',$con,$insertVal);