<?php
require 'include.php';
$res = array(); //返回json对象
$pagesize = 10;



if(array_key_exists('num',$_GET)){
	$pagenum = $_GET['num'];
} else {
	$pagenum = 1;
}

$list = selectList('a888888',$pagenum,$pagesize,$con);




$res['data'] = $list;
$res['pagenum'] = $pagenum;

// echo $pagenum;
echo json_encode($res);