<?php
$host = 'localhost';
$username = 'root';
$password = 'usbw';
$dbname = 'test1';
// connect
$con = mysqli_connect($host, $username, $password, $dbname);


if (mysqli_connect_errno($con)) {
	echo "连接失败原因: " . mysqli_connect_error();
	echo '</br>';
} else {
	// echo '连接成功!';
}
