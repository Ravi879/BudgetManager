<?php
require('BudgetDatabase.php');
session_start();

if(isset($_SESSION['id']) && isset($_POST['type'])){
	$type = $_POST['type'];
	$description = $_POST['description'];
	$value = $_POST['value'];
	$ID = $_SESSION['id'];
		$database = new BudgetDatabase($ID);
		
		if($database->initDatabase($type)){
			$custom_id =  $database->getItemCustomId($_SESSION['id'], $type);
			$database->insert($custom_id, $type, $description, $value);
			return;
		}else{
			echo json_encode(array("result"=>"error database initialition failed"));
			return;
		}
		
	}
	else{
		echo json_encode(array("result"=>"Error, Parameters not passed"));
	}

?>