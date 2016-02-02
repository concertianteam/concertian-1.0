<?php
include ('httpful.phar');
		$pwdNe = $_POST['pwdNe'];
		$tru = "0";
		$options = [
			'cost' => 12,
		];

$pwd = password_hash($pwdNe, PASSWORD_BCRYPT, $options);
	echo json_encode($pwd);
?>