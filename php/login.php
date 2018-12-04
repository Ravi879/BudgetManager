<?php
require('UserDatabase.php');
session_start();

if(isset($_POST['email']) && isset($_POST['password']) ){
	$email = $_POST['email'];
	$password = $_POST['password'];

	$db = new UserDatabase();
	if($db->initDatabase()){
		$id =  $db->getSingleUser($email, $password);
		
		if($id==true){
			$_SESSION['id'] = $id;
			echo "ok";
		}else{
			echo "Invalid email or password.";
		}

	}else{
		echo "Database initialization failed";
	}
	
}else{
	echo "Invalid parameter passed";
    return;
}

?>