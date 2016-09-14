<?php

// 添加单引号
function addQ($val){
	return "'" . $val . "'";
}

function executeSql($sql,$con){
	// Execute query
	if (mysqli_query($con,$sql))
	{
		echo "成功!";
	} else {
		echo "失败原因：" . mysqli_error($con);
	}
	echo '</br>';

}

function createList($listname,$con){
	$sql = "
	CREATE TABLE $listname
	(
	PID INT NOT NULL AUTO_INCREMENT, 
	PRIMARY KEY(PID),
	title CHAR(50),
	content LONGTEXT,
	cover CHAR(100),
	storeup INT default 0
	)engine=innodb default charset=utf8 auto_increment=1";

	executeSql($sql,$con);
	
}

function deleteList($listname,$con,$key){
	if($key === '888'){
		$sql = "drop table $listname";
		executeSql($sql,$con);
	}else{
		echo $key . '(key)错误，没有删除</br>';
	}
	
}




function insertList($listname,$con,$post){
	$sql = "
	INSERT INTO  `$listname` ( `PID`, `title`, `content`, `cover`, `storeup`)
	VALUES (
		NULL,"
		.addQ($post['title'])	.","
		.addQ($post['content'])	.","
		.addQ($post['cover'])	.","
		.addQ($post['storeup'])
	.")";
	// $sql = "INSERT INTO `a888888` (`PID`, `title`, `content`, `cover`, `storeup`) VALUES (NULL, 'title', 'content', 'cover', '0');";
	
	// echo $sql . '</br>';
	executeSql($sql,$con);
}


function selectList($listname,$pagenum,$pagesize,$con){
	$start = ($pagenum -1) * $pagesize;
	$sql = '';
	$result = mysqli_query($con,"SELECT * FROM $listname ORDER BY  `PID` DESC limit $start,$pagesize");

	// $allnum=mysqli_num_rows($result);
	// echo '</br>';
	// echo $allnum;
	// echo '</br>';
	// 
	$array = array();
	$num = 0;
	while($row = mysqli_fetch_array($result))
	{
		// echo $row['title'] . " " . $row['cover'];
		// echo "<br>";
		// print_r($row);

		$array[$num] = array(
			'pid'		=>	$row['PID'],
			'title'		=> 	$row['title'],
			'content'	=>	$row['content'],
			'cover'		=>	$row['cover'],
			'storeup'	=>	$row['storeup']	
		);
		$num++;
	}

	// echo json_encode($array);
	// print_r($array);
	return $array;

}

